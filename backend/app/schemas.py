from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field


class ToneEnum(str, Enum):
    """Supported email tones."""

    professional = "professional"
    friendly = "friendly"
    formal = "formal"
    casual = "casual"


class EmailGenerateRequest(BaseModel):
    """Request body for generating an email."""

    prompt: str = Field(..., min_length=3, description="Description of the email to generate")
    tone: ToneEnum = Field(default=ToneEnum.professional, description="Desired tone of the email")
    provider: Optional[str] = Field(default=None, description="Optional AI provider to use")
    model: Optional[str] = Field(default=None, description="Optional AI model to use")


class EmailGenerateResponse(BaseModel):
    """Response body containing the generated email."""

    subject: str
    body: str
    provider: str
    model: str


class EmailHistoryItem(BaseModel):
    """A single email history entry."""

    id: int
    prompt: str
    tone: str
    subject: str
    body: str
    provider: str
    model: str
    created_at: datetime

    model_config = {"from_attributes": True}


class EmailHistoryResponse(BaseModel):
    """Paginated list of email history items."""

    items: List[EmailHistoryItem]
    total: int


class ErrorResponse(BaseModel):
    """Standard error response."""

    detail: str


class UserCreate(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    email: str
    created_at: datetime

    model_config = {"from_attributes": True}


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
