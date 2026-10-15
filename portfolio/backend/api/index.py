# Vercel serverless entrypoint: exposes the FastAPI app. Local dev uses app.main:app directly.
from app.main import app  # noqa: F401
