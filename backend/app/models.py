from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Integer, String, Text

from app.database import Base


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
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    def __repr__(self) -> str:
        return f"<EmailHistory(id={self.id}, subject='{self.subject[:40]}...')>"
