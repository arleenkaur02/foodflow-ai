import { fallbackFor } from "./fallback";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type Recommendation = {
  agent: string;
  severity: "critical" | "warning" | "info";
  title: string;
  impact: string;
  action: string;
};

export type Dashboard = {
  waste_at_risk_units: number;
  recoverable_margin: number;
  donation_ready_units: number;
  forecast_accuracy: number;
  recommendations: Recommendation[];
};

export type InventoryRow = {
  store: string;
  sku: string;
  product: string;
  category: string;
  lot_code: string;
  quantity_on_hand: number;
  expires_at: string;
  days_to_expiry: number;
  spoilage_risk: number;
  recommended_action: string;
};

export type ForecastPoint = {
  date: string;
  forecast_units: number;
  lower_bound: number;
  upper_bound: number;
  drivers: string[];
};

export type Supplier = {
  name: string;
  category: string;
  lead_time_days: number;
  reliability_score: number;
  minimum_order_units: number;
};

export async function apiGet<T>(path: string): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`API request failed: ${path}`);
    return res.json();
  } catch {
    return fallbackFor(path) as T;
  }
}
