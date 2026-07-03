from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.routes.auth import get_current_user
from app.schemas import (
    EmailGenerateRequest,
    EmailGenerateResponse,
    EmailHistoryResponse,
    ErrorResponse,
)
from app.services import email_service

router = APIRouter(tags=["Email"])


@router.post(
    "/api/generate",
    response_model=EmailGenerateResponse,
    responses={500: {"model": ErrorResponse}},
)
def generate_email(
    request: EmailGenerateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Generate an email based on a prompt and desired tone.

    Calls the configured AI provider, saves the result to history,
    and returns the generated subject and body.
    """
    try:
        return email_service.create_email(db, request.prompt, request.tone.value, current_user.id, request.provider, request.model)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate email: {str(e)}",
        )


@router.get("/api/history", response_model=EmailHistoryResponse)
def get_history(
    skip: int = Query(default=0, ge=0, description="Number of records to skip"),
    limit: int = Query(default=20, ge=1, le=100, description="Max records to return"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Retrieve paginated email generation history, newest first."""
    return email_service.get_history(db, current_user.id, skip=skip, limit=limit)


@router.delete("/api/history/{item_id}", status_code=204)
def delete_history_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Delete a single email history entry by ID."""
    deleted = email_service.delete_history_item(db, item_id, current_user.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="History item not found")
    return None


@router.delete("/api/history", status_code=204)
def clear_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Delete all email history records."""
    email_service.clear_history(db, current_user.id)
    return None
