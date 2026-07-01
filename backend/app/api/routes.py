from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import create_access_token, verify_password
from app.db.session import get_db
from app.models.domain import AuditLog, Notification, Supplier, User
from app.schemas.api import (
    AuditRow,
    DashboardResponse,
    LoginRequest,
    SupplierRow,
    TokenResponse,
)
from app.services.agents import audit_rows, dashboard_metrics, demand_forecast, inventory_rows, recommendations

router = APIRouter()


@router.post("/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.execute(select(User).where(User.email == payload.email)).scalar_one_or_none()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return TokenResponse(access_token=create_access_token(user.email, user.role), full_name=user.full_name, role=user.role)


@router.get("/dashboard", response_model=DashboardResponse)
def dashboard(db: Session = Depends(get_db)):
    return dashboard_metrics(db)


@router.get("/inventory")
def inventory(db: Session = Depends(get_db)):
    return inventory_rows(db)


@router.get("/forecasts")
def forecasts(db: Session = Depends(get_db)):
    return demand_forecast(db)


@router.get("/recommendations")
def agent_recommendations(db: Session = Depends(get_db)):
    return recommendations(db)


@router.get("/suppliers", response_model=list[SupplierRow])
def suppliers(db: Session = Depends(get_db)):
    rows = db.execute(select(Supplier).order_by(Supplier.category, Supplier.name)).scalars().all()
    return [
        SupplierRow(
            name=row.name,
            category=row.category,
            lead_time_days=row.lead_time_days,
            reliability_score=float(row.reliability_score),
            minimum_order_units=row.minimum_order_units,
        )
        for row in rows
    ]


@router.get("/notifications")
def notifications(db: Session = Depends(get_db)):
    return db.execute(select(Notification).order_by(Notification.created_at.desc())).scalars().all()


@router.get("/audit", response_model=list[AuditRow])
def audit(db: Session = Depends(get_db)):
    return audit_rows(db)
