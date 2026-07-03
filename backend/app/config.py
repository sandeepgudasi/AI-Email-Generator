from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables and .env file."""

    AI_PROVIDER: str = "gemini"
    AI_API_KEY: str | None = None
    AI_MODEL: str = "gemini-2.0-flash"
    DATABASE_URL: str = "sqlite:///./email_history.db"
    OLLAMA_BASE_URL: str = "http://localhost:11434/v1"

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
    }


@lru_cache
def get_settings() -> Settings:
    """Return cached application settings instance."""
    return Settings()
