from sqlalchemy.orm import Session

from app.config import get_settings
from app.models import EmailHistory
from app.schemas import EmailGenerateResponse, EmailHistoryItem, EmailHistoryResponse
from app.services.ai_service import generate_email


def create_email(db: Session, prompt: str, tone: str) -> EmailGenerateResponse:
    """Generate an email via AI and persist it to the database.

    Args:
        db: Active database session.
        prompt: User's description of the email to generate.
        tone: Desired tone for the email.

    Returns:
        EmailGenerateResponse with the generated subject, body, provider, and model.
    """
    settings = get_settings()

    # Call the AI provider
    result = generate_email(prompt, tone)

    # Save to history
    history_entry = EmailHistory(
        prompt=prompt,
        tone=tone,
        subject=result["subject"],
        body=result["body"],
        provider=settings.AI_PROVIDER,
        model=settings.AI_MODEL,
    )
    db.add(history_entry)
    db.commit()
    db.refresh(history_entry)

    return EmailGenerateResponse(
        subject=result["subject"],
        body=result["body"],
        provider=settings.AI_PROVIDER,
        model=settings.AI_MODEL,
    )


def get_history(db: Session, skip: int = 0, limit: int = 20) -> EmailHistoryResponse:
    """Fetch paginated email generation history.

    Args:
        db: Active database session.
        skip: Number of records to skip (offset).
        limit: Maximum number of records to return.

    Returns:
        EmailHistoryResponse with items and total count.
    """
    total = db.query(EmailHistory).count()
    items = (
        db.query(EmailHistory)
        .order_by(EmailHistory.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return EmailHistoryResponse(
        items=[EmailHistoryItem.model_validate(item) for item in items],
        total=total,
    )


def delete_history_item(db: Session, item_id: int) -> bool:
    """Delete a single history entry by ID.

    Args:
        db: Active database session.
        item_id: ID of the history entry to delete.

    Returns:
        True if the item was found and deleted, False otherwise.
    """
    item = db.query(EmailHistory).filter(EmailHistory.id == item_id).first()
    if not item:
        return False

    db.delete(item)
    db.commit()
    return True


def clear_history(db: Session) -> int:
    """Delete all email history records.

    Args:
        db: Active database session.

    Returns:
        Number of records deleted.
    """
    count = db.query(EmailHistory).delete()
    db.commit()
    return count
