from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .contact import router as contact_router

settings = get_settings()

app = FastAPI(title="Portfolio API", docs_url="/docs", redoc_url=None)

# Saare valid frontend URLs yahan explicitly define kar diye hain
origins = [
    "https://mohammed-yasir-portfolio.vercel.app",
    "https://mohammed-yasir-portfolio-jgoz.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Agar settings ya environment variable mein aur bhi ho toh unhe safely merge kar lo
try:
    if hasattr(settings, "cors_origin_list") and settings.cors_origin_list:
        origins.extend(settings.cors_origin_list)
    elif hasattr(settings, "CORS_ORIGINS") and settings.CORS_ORIGINS:
        if isinstance(settings.CORS_ORIGINS, str):
            origins.extend([o.strip() for o in settings.CORS_ORIGINS.split(",") if o.strip()])
except Exception:
    pass

# Duplicate entries hatane ke liye
origins = list(set(origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact_router)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "operational"}
