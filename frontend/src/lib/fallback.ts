import type { Dashboard, ForecastPoint, InventoryRow, Supplier } from "./api";

export const fallbackDashboard: Dashboard = {
  waste_at_risk_units: 514,
  recoverable_margin: 1207.9,
  donation_ready_units: 173,
  forecast_accuracy: 0.91,
  recommendations: [
    {
      agent: "Spoilage Prediction Agent",
      severity: "critical",
      title: "6 lots need action before expiry",
      impact: "514 units are recoverable through markdown, transfer, or donation.",
      action: "Prioritize lots expiring within 72 hours and execute markdown before close."
    },
    {
      agent: "Demand Forecast Agent",
      severity: "warning",
      title: "Upcoming events and heat increase convenience demand",
      impact: "Seven-day demand forecast shows elevated prepared-food and produce movement.",
      action: "Increase fast-moving cold case inventory while avoiding bakery over-ordering."
    },
    {
      agent: "Donation Recommendation Agent",
      severity: "info",
      title: "2 active donation partners available",
      impact: "Safe food can be redirected inside pickup windows instead of discarded.",
      action: "Reserve donation capacity for prepared and bakery units not sold after markdown."
    }
  ]
};

export const fallbackForecasts: ForecastPoint[] = [
  { date: "2026-07-01", forecast_units: 126, lower_bound: 111, upper_bound: 144, drivers: ["extreme heat convenience demand"] },
  { date: "2026-07-02", forecast_units: 126, lower_bound: 111, upper_bound: 144, drivers: ["extreme heat convenience demand"] },
  { date: "2026-07-03", forecast_units: 155, lower_bound: 136, upper_bound: 177, drivers: ["weekend traffic", "local event lift"] },
  { date: "2026-07-04", forecast_units: 163, lower_bound: 143, upper_bound: 186, drivers: ["weekend traffic", "local event lift"] },
  { date: "2026-07-05", forecast_units: 133, lower_bound: 117, upper_bound: 152, drivers: ["weekend traffic"] },
  { date: "2026-07-06", forecast_units: 117, lower_bound: 103, upper_bound: 133, drivers: ["baseline velocity"] },
  { date: "2026-07-07", forecast_units: 117, lower_bound: 103, upper_bound: 133, drivers: ["baseline velocity"] }
];

export const fallbackInventory: InventoryRow[] = [
  { store: "FoodFlow Market Downtown", sku: "BAK-SRD-LOAF", product: "Sourdough Loaf", category: "Bakery", lot_code: "SRD-PHX-0630C", quantity_on_hand: 58, expires_at: "2026-07-04", days_to_expiry: 3, spoilage_risk: 0.91, recommended_action: "Discount 20% today, route unsold safe units to donation partner tomorrow" },
  { store: "FoodFlow Market Downtown", sku: "PRD-ORG-BAN-3LB", product: "Organic Bananas 3 lb", category: "Produce", lot_code: "BAN-PHX-0629A", quantity_on_hand: 112, expires_at: "2026-07-04", days_to_expiry: 3, spoilage_risk: 0.83, recommended_action: "Discount 20% today, route unsold safe units to donation partner tomorrow" },
  { store: "FoodFlow Market Mesa", sku: "PRD-ORG-BAN-3LB", product: "Organic Bananas 3 lb", category: "Produce", lot_code: "BAN-MES-0628A", quantity_on_hand: 61, expires_at: "2026-07-03", days_to_expiry: 2, spoilage_risk: 0.77, recommended_action: "Discount 20% today, route unsold safe units to donation partner tomorrow" },
  { store: "FoodFlow Market Downtown", sku: "PFD-SAL-COBB", product: "Cobb Salad Bowl", category: "Prepared", lot_code: "SAL-PHX-0630A", quantity_on_hand: 39, expires_at: "2026-07-03", days_to_expiry: 2, spoilage_risk: 0.74, recommended_action: "Discount 20% today, route unsold safe units to donation partner tomorrow" },
  { store: "FoodFlow Market Mesa", sku: "PRD-STW-1LB", product: "Strawberries 1 lb", category: "Produce", lot_code: "STW-MES-0630A", quantity_on_hand: 84, expires_at: "2026-07-04", days_to_expiry: 3, spoilage_risk: 0.49, recommended_action: "Move to front-of-store placement and activate targeted markdown" }
];

export const fallbackSuppliers: Supplier[] = [
  { name: "Copper State Bakery", category: "Bakery", lead_time_days: 1, reliability_score: 0.88, minimum_order_units: 30 },
  { name: "Desert Bloom Dairy", category: "Dairy", lead_time_days: 2, reliability_score: 0.91, minimum_order_units: 24 },
  { name: "Riverbend Prepared Foods", category: "Prepared", lead_time_days: 2, reliability_score: 0.9, minimum_order_units: 20 },
  { name: "Sonoran Produce Cooperative", category: "Produce", lead_time_days: 1, reliability_score: 0.94, minimum_order_units: 40 }
];

export const fallbackNotifications = [
  { id: "n1", severity: "critical", title: "Cobb salad spoilage window", body: "Downtown has 39 salad bowls expiring by 2026-07-03; recommend 20% markdown now and donation review tomorrow.", created_at: "2026-07-01T09:00:00Z", acknowledged: false },
  { id: "n2", severity: "warning", title: "Banana transfer opportunity", body: "Downtown demand lift from First Friday can absorb Mesa overstock before expiration.", created_at: "2026-07-01T08:40:00Z", acknowledged: false },
  { id: "n3", severity: "info", title: "Supplier reliability watch", body: "Copper State Bakery reliability dipped below 0.90; keep sourdough safety stock one day higher.", created_at: "2026-07-01T08:10:00Z", acknowledged: false }
];

export const fallbackAudit = [
  { actor: "system-agent", action: "generated spoilage recommendation", entity_type: "inventory_lot", entity_id: "SAL-PHX-0630A", created_at: "2026-07-01T09:00:00Z" },
  { actor: "Maya Hernandez", action: "acknowledged transfer recommendation", entity_type: "product", entity_id: "PRD-ORG-BAN-3LB", created_at: "2026-07-01T08:45:00Z" },
  { actor: "system-agent", action: "refreshed demand forecasts", entity_type: "store", entity_id: "FoodFlow Market Downtown", created_at: "2026-07-01T08:30:00Z" }
];

export function fallbackFor(path: string): unknown {
  if (path === "/api/dashboard") return fallbackDashboard;
  if (path === "/api/forecasts") return fallbackForecasts;
  if (path === "/api/inventory") return fallbackInventory;
  if (path === "/api/suppliers") return fallbackSuppliers;
  if (path === "/api/notifications") return fallbackNotifications;
  if (path === "/api/audit") return fallbackAudit;
  return null;
}
