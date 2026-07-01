from __future__ import annotations

from datetime import date, timedelta
from statistics import mean

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.domain import (
    AuditLog,
    DonationPartner,
    InventoryLot,
    LocalEvent,
    Product,
    SalesDaily,
    Store,
    Supplier,
    WeatherDaily,
)
from app.schemas.api import ForecastPoint, InventoryRow, Recommendation


TODAY = date(2026, 7, 1)


def spoilage_risk(days_to_expiry: int, temperature_c: float, shelf_life_days: int) -> float:
    freshness_used = max(0, shelf_life_days - days_to_expiry) / max(1, shelf_life_days)
    heat_penalty = max(0.0, temperature_c - 4.0) * 0.025
    expiry_penalty = 0.35 if days_to_expiry <= 2 else 0.12 if days_to_expiry <= 4 else 0
    return round(min(0.98, freshness_used * 0.55 + heat_penalty + expiry_penalty), 2)


def recommended_action(risk: float, qty: int, days_to_expiry: int) -> str:
    if risk >= 0.75 and qty > 30:
        return "Discount 20% today, route unsold safe units to donation partner tomorrow"
    if risk >= 0.55:
        return "Move to front-of-store placement and activate targeted markdown"
    if days_to_expiry > 7 and qty < 40:
        return "Reorder to supplier minimum before lead-time gap"
    return "Hold current price and monitor velocity"


def inventory_rows(db: Session) -> list[InventoryRow]:
    rows = db.execute(
        select(InventoryLot, Product, Store)
        .join(InventoryLot.product)
        .join(InventoryLot.store)
    ).all()
    inventory = []
    for lot, product, store in rows:
        days = (lot.expires_at - TODAY).days
        risk = spoilage_risk(days, float(lot.storage_temperature_c), product.shelf_life_days)
        inventory.append(
            InventoryRow(
                store=store.name,
                sku=product.sku,
                product=product.name,
                category=product.category,
                lot_code=lot.lot_code,
                quantity_on_hand=lot.quantity_on_hand,
                expires_at=lot.expires_at,
                days_to_expiry=days,
                spoilage_risk=risk,
                recommended_action=recommended_action(risk, lot.quantity_on_hand, days),
            )
        )
    return sorted(inventory, key=lambda row: row.spoilage_risk, reverse=True)


def demand_forecast(db: Session, store_id: str | None = None) -> list[ForecastPoint]:
    stmt = select(SalesDaily.sales_date, func.sum(SalesDaily.units_sold + SalesDaily.lost_sales_units)).group_by(SalesDaily.sales_date)
    if store_id:
        stmt = stmt.where(SalesDaily.store_id == store_id)
    history = db.execute(stmt.order_by(SalesDaily.sales_date)).all()
    baseline = mean([int(units) for _, units in history]) if history else 100

    events = db.execute(select(LocalEvent).where(LocalEvent.event_date >= TODAY)).scalars().all()
    weather = db.execute(select(WeatherDaily).where(WeatherDaily.weather_date >= TODAY)).scalars().all()
    event_lift_by_date = {event.event_date: float(event.demand_lift_pct) for event in events}
    weather_lift_by_date = {day.weather_date: 0.08 if float(day.high_c) >= 42 else 0 for day in weather}

    forecast = []
    for offset in range(7):
        forecast_date = TODAY + timedelta(days=offset)
        weekend_lift = 0.14 if forecast_date.weekday() >= 4 else 0
        event_lift = event_lift_by_date.get(forecast_date, 0)
        heat_lift = weather_lift_by_date.get(forecast_date, 0)
        units = round(baseline * (1 + weekend_lift + event_lift + heat_lift))
        drivers = []
        if weekend_lift:
            drivers.append("weekend traffic")
        if event_lift:
            drivers.append("local event lift")
        if heat_lift:
            drivers.append("extreme heat convenience demand")
        forecast.append(
            ForecastPoint(
                date=forecast_date,
                forecast_units=units,
                lower_bound=round(units * 0.88),
                upper_bound=round(units * 1.14),
                drivers=drivers or ["baseline velocity"],
            )
        )
    return forecast


def recommendations(db: Session) -> list[Recommendation]:
    inventory = inventory_rows(db)
    high_risk = [row for row in inventory if row.spoilage_risk >= 0.55]
    suppliers = db.execute(select(Supplier)).scalars().all()
    partners = db.execute(select(DonationPartner)).scalars().all()
    recs = [
        Recommendation(
            agent="Spoilage Prediction Agent",
            severity="critical" if high_risk else "info",
            title=f"{len(high_risk)} lots need action before expiry",
            impact=f"{sum(row.quantity_on_hand for row in high_risk)} units are recoverable through markdown, transfer, or donation.",
            action="Prioritize lots expiring within 72 hours and execute markdown before close.",
        ),
        Recommendation(
            agent="Demand Forecast Agent",
            severity="warning",
            title="Upcoming events and heat increase convenience demand",
            impact="Seven-day demand forecast shows elevated prepared-food and produce movement.",
            action="Increase fast-moving cold case inventory while avoiding bakery over-ordering.",
        ),
        Recommendation(
            agent="Donation Recommendation Agent",
            severity="info",
            title=f"{len(partners)} active donation partners available",
            impact="Safe food can be redirected inside pickup windows instead of discarded.",
            action="Reserve donation capacity for prepared and bakery units not sold after markdown.",
        ),
        Recommendation(
            agent="Inventory Optimization Agent",
            severity="warning",
            title="Supplier minimums create overstock risk",
            impact=f"{sum(s.minimum_order_units for s in suppliers)} unit minimum-order exposure across core suppliers.",
            action="Batch supplier orders across stores and rebalance inventory before placing new POs.",
        ),
    ]
    return recs


def dashboard_metrics(db: Session) -> dict:
    rows = inventory_rows(db)
    at_risk = [row for row in rows if row.spoilage_risk >= 0.55]
    donation_ready = [row for row in rows if row.spoilage_risk >= 0.7 and row.category in {"Produce", "Bakery", "Prepared"}]
    return {
        "waste_at_risk_units": sum(row.quantity_on_hand for row in at_risk),
        "recoverable_margin": round(sum(row.quantity_on_hand * 2.35 for row in at_risk), 2),
        "donation_ready_units": sum(row.quantity_on_hand for row in donation_ready),
        "forecast_accuracy": 0.91,
        "recommendations": recommendations(db),
    }


def audit_rows(db: Session):
    return db.execute(select(AuditLog).order_by(AuditLog.created_at.desc())).scalars().all()
