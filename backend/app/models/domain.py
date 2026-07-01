from sqlalchemy import ARRAY, Boolean, Date, DateTime, ForeignKey, Integer, Numeric, String, Text, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    email: Mapped[str] = mapped_column(String, unique=True)
    password_hash: Mapped[str] = mapped_column(Text)
    role: Mapped[str] = mapped_column(String)
    full_name: Mapped[str] = mapped_column(String)


class Store(Base):
    __tablename__ = "stores"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    name: Mapped[str] = mapped_column(String)
    city: Mapped[str] = mapped_column(String)
    state: Mapped[str] = mapped_column(String)
    format: Mapped[str] = mapped_column(String)


class Supplier(Base):
    __tablename__ = "suppliers"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    name: Mapped[str] = mapped_column(String)
    category: Mapped[str] = mapped_column(String)
    lead_time_days: Mapped[int] = mapped_column(Integer)
    reliability_score: Mapped[float] = mapped_column(Numeric)
    minimum_order_units: Mapped[int] = mapped_column(Integer)


class Product(Base):
    __tablename__ = "products"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    sku: Mapped[str] = mapped_column(String, unique=True)
    name: Mapped[str] = mapped_column(String)
    category: Mapped[str] = mapped_column(String)
    shelf_life_days: Mapped[int] = mapped_column(Integer)
    unit_cost: Mapped[float] = mapped_column(Numeric)
    retail_price: Mapped[float] = mapped_column(Numeric)
    supplier_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("suppliers.id"))
    supplier: Mapped[Supplier] = relationship()


class InventoryLot(Base):
    __tablename__ = "inventory_lots"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    store_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("stores.id"))
    product_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("products.id"))
    lot_code: Mapped[str] = mapped_column(String)
    quantity_on_hand: Mapped[int] = mapped_column(Integer)
    received_at = mapped_column(Date)
    expires_at = mapped_column(Date)
    storage_temperature_c: Mapped[float] = mapped_column(Numeric)
    store: Mapped[Store] = relationship()
    product: Mapped[Product] = relationship()


class SalesDaily(Base):
    __tablename__ = "sales_daily"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    store_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("stores.id"))
    product_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("products.id"))
    sales_date = mapped_column(Date)
    units_sold: Mapped[int] = mapped_column(Integer)
    lost_sales_units: Mapped[int] = mapped_column(Integer)
    promo_depth: Mapped[float] = mapped_column(Numeric)


class WeatherDaily(Base):
    __tablename__ = "weather_daily"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    store_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("stores.id"))
    weather_date = mapped_column(Date)
    condition: Mapped[str] = mapped_column(String)
    high_c: Mapped[float] = mapped_column(Numeric)
    precipitation_mm: Mapped[float] = mapped_column(Numeric)


class LocalEvent(Base):
    __tablename__ = "local_events"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    store_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("stores.id"))
    event_date = mapped_column(Date)
    name: Mapped[str] = mapped_column(String)
    expected_attendance: Mapped[int] = mapped_column(Integer)
    demand_lift_pct: Mapped[float] = mapped_column(Numeric)


class DonationPartner(Base):
    __tablename__ = "donation_partners"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    name: Mapped[str] = mapped_column(String)
    city: Mapped[str] = mapped_column(String)
    accepts_categories: Mapped[list[str]] = mapped_column(ARRAY(Text))
    pickup_window: Mapped[str] = mapped_column(String)
    max_units_per_pickup: Mapped[int] = mapped_column(Integer)


class Notification(Base):
    __tablename__ = "notifications"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    severity: Mapped[str] = mapped_column(String)
    title: Mapped[str] = mapped_column(String)
    body: Mapped[str] = mapped_column(Text)
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    acknowledged: Mapped[bool] = mapped_column(Boolean)


class AuditLog(Base):
    __tablename__ = "audit_logs"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    actor: Mapped[str] = mapped_column(String)
    action: Mapped[str] = mapped_column(String)
    entity_type: Mapped[str] = mapped_column(String)
    entity_id: Mapped[str] = mapped_column(String)
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
