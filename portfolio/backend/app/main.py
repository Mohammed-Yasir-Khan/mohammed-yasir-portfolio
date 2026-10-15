from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .contact import router as contact_router

settings = get_settings()

app = FastAPI(title="Portfolio API", docs_url="/docs", redoc_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

app.include_router(contact_router)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "operational"}
