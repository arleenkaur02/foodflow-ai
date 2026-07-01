from sqlalchemy.orm import Session

from app.services.agents import dashboard_metrics, demand_forecast, inventory_rows, recommendations


def refresh_agent_outputs(db: Session) -> dict:
    """Background worker entry point for scheduled forecast and recommendation refreshes."""
    return {
        "dashboard": dashboard_metrics(db),
        "forecasts": demand_forecast(db),
        "inventory": inventory_rows(db),
        "recommendations": recommendations(db),
    }
