CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'operator',
  full_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  latitude NUMERIC(9,6) NOT NULL,
  longitude NUMERIC(9,6) NOT NULL,
  format TEXT NOT NULL
);

CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  lead_time_days INT NOT NULL,
  reliability_score NUMERIC(4,2) NOT NULL,
  minimum_order_units INT NOT NULL
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  shelf_life_days INT NOT NULL,
  unit_cost NUMERIC(10,2) NOT NULL,
  retail_price NUMERIC(10,2) NOT NULL,
  supplier_id UUID REFERENCES suppliers(id)
);

CREATE TABLE inventory_lots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id),
  product_id UUID REFERENCES products(id),
  lot_code TEXT NOT NULL,
  quantity_on_hand INT NOT NULL,
  received_at DATE NOT NULL,
  expires_at DATE NOT NULL,
  storage_temperature_c NUMERIC(4,1) NOT NULL
);

CREATE TABLE sales_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id),
  product_id UUID REFERENCES products(id),
  sales_date DATE NOT NULL,
  units_sold INT NOT NULL,
  lost_sales_units INT NOT NULL DEFAULT 0,
  promo_depth NUMERIC(4,2) NOT NULL DEFAULT 0
);

CREATE TABLE weather_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id),
  weather_date DATE NOT NULL,
  condition TEXT NOT NULL,
  high_c NUMERIC(4,1) NOT NULL,
  precipitation_mm NUMERIC(5,1) NOT NULL
);

CREATE TABLE local_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id),
  event_date DATE NOT NULL,
  name TEXT NOT NULL,
  expected_attendance INT NOT NULL,
  demand_lift_pct NUMERIC(5,2) NOT NULL
);

CREATE TABLE donation_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  accepts_categories TEXT[] NOT NULL,
  pickup_window TEXT NOT NULL,
  max_units_per_pickup INT NOT NULL
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  severity TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  acknowledged BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
