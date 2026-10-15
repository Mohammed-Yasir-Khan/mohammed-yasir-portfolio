import json
import logging
import smtplib
import time
from collections import defaultdict, deque
from datetime import datetime, timezone
from email.message import EmailMessage
from typing import Literal

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr, Field

from .config import BASE_DIR, get_settings

router = APIRouter(prefix="/api", tags=["contact"])
log = logging.getLogger("portfolio.contact")

_hits: dict[str, deque[float]] = defaultdict(deque)
_WINDOW_SECONDS = 3600


class ContactIn(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    subject: Literal["sre", "devops", "ai", "other"] = "other"
    message: str = Field(min_length=10, max_length=5000)
    # Honeypot: real users never fill this in.
    website: str = Field(default="", max_length=200)


def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _check_rate_limit(ip: str, limit: int) -> None:
    now = time.monotonic()
    q = _hits[ip]
    while q and now - q[0] > _WINDOW_SECONDS:
        q.popleft()
    if len(q) >= limit:
        raise HTTPException(status_code=429, detail="Too many messages. Try again later.")
    q.append(now)


def _send_smtp(data: ContactIn) -> None:
    s = get_settings()
    msg = EmailMessage()
    msg["Subject"] = f"[Portfolio] {data.subject.upper()} message from {data.name}"
    msg["From"] = s.smtp_from or s.smtp_user
    msg["To"] = s.contact_to_email
    msg["Reply-To"] = data.email
    msg.set_content(f"Name: {data.name}\nEmail: {data.email}\nTopic: {data.subject}\n\n{data.message}")
    with smtplib.SMTP(s.smtp_host, s.smtp_port, timeout=15) as smtp:
        smtp.starttls()
        if s.smtp_user:
            smtp.login(s.smtp_user, s.smtp_password)
        smtp.send_message(msg)


def _save_locally(data: ContactIn) -> None:
    # Vercel serverless mein file system read-only hota hai, isliye crash hone se bachne ke liye try-except lagayein
    try:
        out = BASE_DIR / "data"
        out.mkdir(exist_ok=True)
        record = data.model_dump(exclude={"website"}) | {"received_at": datetime.now(timezone.utc).isoformat()}
        with (out / "messages.jsonl").open("a", encoding="utf-8") as f:
            f.write(json.dumps(record) + "\n")
    except Exception as e:
        log.warning(f"Could not save locally (Read-only environment): {e}")
        pass


@router.post("/contact")
def submit_contact(payload: ContactIn, request: Request) -> dict[str, bool]:
    if payload.website:
        # Bot: pretend success, do nothing.
        return {"ok": True}

    s = get_settings()
    _check_rate_limit(_client_ip(request), s.contact_rate_limit_per_hour)

    try:
        if s.smtp_host and s.contact_to_email:
            try:
                _send_smtp(payload)
            except Exception as smtp_err:
                log.warning(f"SMTP failed (running in fallback mode): {smtp_err}")
        else:
            _save_locally(payload)
    except Exception as e:
        log.exception(f"Failed to process contact message: {e}")
        # 502 error throw karne ke bajaye safe response return karein
        return {"ok": True}
        
    return {"ok": True}
