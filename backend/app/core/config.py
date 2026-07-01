from __future__ import annotations

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_env: str = "development"
    database_url: str = "sqlite:///./foodflow.db"
    redis_url: str = "redis://localhost:6379/0"
    jwt_secret: str = "change-me-before-production"
    jwt_algorithm: str = "HS256"
    access_token_minutes: int = 60 * 8
    openai_api_key: str | None = None


settings = Settings()
