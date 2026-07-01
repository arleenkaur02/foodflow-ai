from datetime import date

from app.services.agents import recommended_action, spoilage_risk


def test_spoilage_risk_increases_near_expiry():
    fresh = spoilage_risk(days_to_expiry=9, temperature_c=3.0, shelf_life_days=14)
    expiring = spoilage_risk(days_to_expiry=1, temperature_c=5.0, shelf_life_days=14)
    assert expiring > fresh


def test_recommended_action_prioritizes_high_quantity_high_risk():
    action = recommended_action(risk=0.8, qty=50, days_to_expiry=1)
    assert "Discount" in action
