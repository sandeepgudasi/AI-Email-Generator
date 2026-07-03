from fastapi import APIRouter

from app.config import get_settings

router = APIRouter(tags=["Health"])


@router.get("/api/health")
def health_check():
    """Return service health status and the configured AI provider."""
    settings = get_settings()
    return {
        "status": "healthy",
        "provider": settings.AI_PROVIDER,
    }
