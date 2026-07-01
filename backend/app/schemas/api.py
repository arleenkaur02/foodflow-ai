from datetime import date, datetime
from pydantic import BaseModel


class LoginRequest(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    full_name: str
    role: str


class InventoryRow(BaseModel):
    store: str
    sku: str
    product: str
    category: str
    lot_code: str
    quantity_on_hand: int
    expires_at: date
    days_to_expiry: int
    spoilage_risk: float
    recommended_action: str


class ForecastPoint(BaseModel):
    date: date
    forecast_units: int
    lower_bound: int
    upper_bound: int
    drivers: list[str]


class Recommendation(BaseModel):
    agent: str
    severity: str
    title: str
    impact: str
    action: str


class DashboardResponse(BaseModel):
    waste_at_risk_units: int
    recoverable_margin: float
    donation_ready_units: int
    forecast_accuracy: float
    recommendations: list[Recommendation]


class SupplierRow(BaseModel):
    name: str
    category: str
    lead_time_days: int
    reliability_score: float
    minimum_order_units: int


class AuditRow(BaseModel):
    actor: str
    action: str
    entity_type: str
    entity_id: str
    created_at: datetime
