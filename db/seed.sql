INSERT INTO users (email, password_hash, role, full_name) VALUES
('ops@foodflow.ai', '$2b$12$6GaqCztuf5z2HWmpLGwIsuYZczMqvC9aoElpoW22P83KZoZQ6N.uW', 'admin', 'Maya Hernandez');

INSERT INTO stores (id, name, city, state, latitude, longitude, format) VALUES
('11111111-1111-1111-1111-111111111111', 'FoodFlow Market Downtown', 'Phoenix', 'AZ', 33.4484, -112.0740, 'urban supermarket'),
('22222222-2222-2222-2222-222222222222', 'FoodFlow Market Mesa', 'Mesa', 'AZ', 33.4152, -111.8315, 'suburban grocery'),
('33333333-3333-3333-3333-333333333333', 'FoodFlow Distribution Tempe', 'Tempe', 'AZ', 33.4255, -111.9400, 'micro-fulfillment');

INSERT INTO suppliers (id, name, category, lead_time_days, reliability_score, minimum_order_units) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Sonoran Produce Cooperative', 'Produce', 1, 0.94, 40),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Desert Bloom Dairy', 'Dairy', 2, 0.91, 24),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Copper State Bakery', 'Bakery', 1, 0.88, 30),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Riverbend Prepared Foods', 'Prepared', 2, 0.90, 20);

INSERT INTO products (id, sku, name, category, shelf_life_days, unit_cost, retail_price, supplier_id) VALUES
('f1111111-1111-1111-1111-111111111111', 'PRD-ORG-BAN-3LB', 'Organic Bananas 3 lb', 'Produce', 5, 1.82, 3.99, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
('f2222222-2222-2222-2222-222222222222', 'DRY-GRK-YOG-32', 'Greek Yogurt 32 oz', 'Dairy', 14, 3.10, 5.99, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
('f3333333-3333-3333-3333-333333333333', 'BAK-SRD-LOAF', 'Sourdough Loaf', 'Bakery', 4, 2.25, 5.49, 'cccccccc-cccc-cccc-cccc-cccccccccccc'),
('f4444444-4444-4444-4444-444444444444', 'PFD-SAL-COBB', 'Cobb Salad Bowl', 'Prepared', 3, 4.20, 8.99, 'dddddddd-dddd-dddd-dddd-dddddddddddd'),
('f5555555-5555-5555-5555-555555555555', 'PRD-STW-1LB', 'Strawberries 1 lb', 'Produce', 4, 2.80, 5.99, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

INSERT INTO inventory_lots (store_id, product_id, lot_code, quantity_on_hand, received_at, expires_at, storage_temperature_c) VALUES
('11111111-1111-1111-1111-111111111111','f1111111-1111-1111-1111-111111111111','BAN-PHX-0629A',112,'2026-06-29','2026-07-04',11.5),
('11111111-1111-1111-1111-111111111111','f2222222-2222-2222-2222-222222222222','YOG-PHX-0624B',46,'2026-06-24','2026-07-08',3.2),
('11111111-1111-1111-1111-111111111111','f3333333-3333-3333-3333-333333333333','SRD-PHX-0630C',58,'2026-06-30','2026-07-04',20.4),
('11111111-1111-1111-1111-111111111111','f4444444-4444-4444-4444-444444444444','SAL-PHX-0630A',39,'2026-06-30','2026-07-03',4.1),
('22222222-2222-2222-2222-222222222222','f1111111-1111-1111-1111-111111111111','BAN-MES-0628A',61,'2026-06-28','2026-07-03',12.7),
('22222222-2222-2222-2222-222222222222','f5555555-5555-5555-5555-555555555555','STW-MES-0630A',84,'2026-06-30','2026-07-04',3.8),
('33333333-3333-3333-3333-333333333333','f2222222-2222-2222-2222-222222222222','YOG-TMP-0626A',120,'2026-06-26','2026-07-10',2.9),
('33333333-3333-3333-3333-333333333333','f4444444-4444-4444-4444-444444444444','SAL-TMP-0630B',75,'2026-06-30','2026-07-03',4.3);

INSERT INTO sales_daily (store_id, product_id, sales_date, units_sold, lost_sales_units, promo_depth) VALUES
('11111111-1111-1111-1111-111111111111','f1111111-1111-1111-1111-111111111111','2026-06-25',26,0,0.00),
('11111111-1111-1111-1111-111111111111','f1111111-1111-1111-1111-111111111111','2026-06-26',31,0,0.00),
('11111111-1111-1111-1111-111111111111','f1111111-1111-1111-1111-111111111111','2026-06-27',37,0,0.05),
('11111111-1111-1111-1111-111111111111','f1111111-1111-1111-1111-111111111111','2026-06-28',42,3,0.05),
('11111111-1111-1111-1111-111111111111','f1111111-1111-1111-1111-111111111111','2026-06-29',29,0,0.00),
('11111111-1111-1111-1111-111111111111','f1111111-1111-1111-1111-111111111111','2026-06-30',34,0,0.00),
('11111111-1111-1111-1111-111111111111','f4444444-4444-4444-4444-444444444444','2026-06-25',18,0,0.00),
('11111111-1111-1111-1111-111111111111','f4444444-4444-4444-4444-444444444444','2026-06-26',24,0,0.00),
('11111111-1111-1111-1111-111111111111','f4444444-4444-4444-4444-444444444444','2026-06-27',33,0,0.10),
('11111111-1111-1111-1111-111111111111','f4444444-4444-4444-4444-444444444444','2026-06-28',29,1,0.10),
('22222222-2222-2222-2222-222222222222','f5555555-5555-5555-5555-555555555555','2026-06-27',22,0,0.00),
('22222222-2222-2222-2222-222222222222','f5555555-5555-5555-5555-555555555555','2026-06-28',28,0,0.05),
('22222222-2222-2222-2222-222222222222','f5555555-5555-5555-5555-555555555555','2026-06-29',24,0,0.00),
('22222222-2222-2222-2222-222222222222','f5555555-5555-5555-5555-555555555555','2026-06-30',26,0,0.00),
('33333333-3333-3333-3333-333333333333','f2222222-2222-2222-2222-222222222222','2026-06-27',41,0,0.00),
('33333333-3333-3333-3333-333333333333','f2222222-2222-2222-2222-222222222222','2026-06-28',47,0,0.00),
('33333333-3333-3333-3333-333333333333','f2222222-2222-2222-2222-222222222222','2026-06-29',39,0,0.00),
('33333333-3333-3333-3333-333333333333','f2222222-2222-2222-2222-222222222222','2026-06-30',44,0,0.00);

INSERT INTO weather_daily (store_id, weather_date, condition, high_c, precipitation_mm) VALUES
('11111111-1111-1111-1111-111111111111','2026-07-01','Extreme heat',43.1,0.0),
('11111111-1111-1111-1111-111111111111','2026-07-02','Extreme heat',44.0,0.0),
('22222222-2222-2222-2222-222222222222','2026-07-01','Hot and dry',42.4,0.0),
('33333333-3333-3333-3333-333333333333','2026-07-01','Hot and dry',42.8,0.0);

INSERT INTO local_events (store_id, event_date, name, expected_attendance, demand_lift_pct) VALUES
('11111111-1111-1111-1111-111111111111','2026-07-03','Downtown First Friday',18000,0.18),
('22222222-2222-2222-2222-222222222222','2026-07-04','Mesa Independence Festival',42000,0.24);

INSERT INTO donation_partners (name, city, accepts_categories, pickup_window, max_units_per_pickup) VALUES
('Valley Community Kitchen', 'Phoenix', ARRAY['Produce','Bakery','Prepared'], '14:00-17:00', 180),
('East Valley Food Rescue', 'Mesa', ARRAY['Produce','Dairy','Bakery'], '09:00-12:00', 220);

INSERT INTO notifications (severity, title, body) VALUES
('critical','Cobb salad spoilage window','Downtown has 39 salad bowls expiring by 2026-07-03; recommend 20% markdown now and donation review tomorrow.'),
('warning','Banana transfer opportunity','Downtown demand lift from First Friday can absorb Mesa overstock before expiration.'),
('info','Supplier reliability watch','Copper State Bakery reliability dipped below 0.90; keep sourdough safety stock one day higher.');

INSERT INTO audit_logs (actor, action, entity_type, entity_id) VALUES
('system-agent','generated spoilage recommendation','inventory_lot','SAL-PHX-0630A'),
('Maya Hernandez','acknowledged transfer recommendation','product','PRD-ORG-BAN-3LB'),
('system-agent','refreshed demand forecasts','store','FoodFlow Market Downtown');
