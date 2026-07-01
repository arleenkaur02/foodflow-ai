# FoodFlow AI

Production-oriented full-stack platform for grocery, restaurant, and distributor food waste prevention.

FoodFlow AI combines demand forecasting, spoilage prediction, inventory optimization, dynamic markdown timing, store redistribution, and donation recommendations into one operational system.

## Stack

- Backend: Python, FastAPI, SQLAlchemy, PostgreSQL, Redis, JWT auth
- Frontend: Next.js, React, TypeScript
- AI services: agent-style domain services with optional OpenAI summarization hooks
- Data: explicit realistic seed records in `db/seed.sql`
- Deployment: Docker Compose
- CI: GitHub Actions

## Quick Start

```bash
cp .env.example .env
docker compose up --build
```

Then open:

- Frontend: http://localhost:3000
- API docs: http://localhost:8000/docs

Demo operator account:

- Email: `ops@foodflow.ai`
- Password: `FoodFlow!2026`

## Local Backend

```bash
cd backend
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Local Frontend

```bash
cd frontend
npm install
npm run dev
```

## Business Domains

- Demand Forecast Agent: predicts seven-day movement from sales velocity, seasonality, weather, and local events.
- Spoilage Prediction Agent: prioritizes lots by shelf-life, temperature risk, and turnover.
- Inventory Optimization Agent: recommends reorder, transfer, discount, hold, or donate actions.
- Dynamic Pricing Agent: times markdowns to protect margin before spoilage risk spikes.
- Store Redistribution Agent: matches overstocked and understocked sites.
- Donation Recommendation Agent: identifies safe donation candidates and partner pickup windows.

## Notes

This repo intentionally avoids random fake data generators. The seeded dataset is hand-authored to represent plausible multi-store grocery operations across product categories, suppliers, sales, weather, holidays, local events, donation partners, and audit activity.
