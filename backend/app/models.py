from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    """User account model."""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    history = relationship("EmailHistory", back_populates="owner")

    def __repr__(self) -> str:
        return f"<User(id={self.id}, email='{self.email}')>"


class EmailHistory(Base):
    """Stores generated email history for later retrieval."""

    __tablename__ = "email_history"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    prompt = Column(Text, nullable=False)
    tone = Column(String(50), nullable=False)
    subject = Column(String(500), nullable=False)
    body = Column(Text, nullable=False)
    provider = Column(String(50), nullable=False)
    model = Column(String(100), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    owner = relationship("User", back_populates="history")

    def __repr__(self) -> str:
        return f"<EmailHistory(id={self.id}, subject='{self.subject[:40]}...')>"
