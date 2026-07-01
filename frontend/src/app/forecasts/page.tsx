"use client";

import { useMemo, useState } from "react";
import { CloudSun, LineChart, MapPin } from "lucide-react";
import { ForecastChart } from "@/components/ForecastChart";
import { fallbackForecasts } from "@/lib/fallback";

const scenarios = {
  baseline: { label: "Baseline", lift: 1, note: "Current sales velocity plus known events and weather." },
  heat: { label: "Extreme heat", lift: 1.12, note: "Adds cold beverage, produce, and prepared-meal demand lift." },
  festival: { label: "Event surge", lift: 1.2, note: "Models added foot traffic near Downtown and Mesa stores." }
};

const storeRows = [
  { store: "Downtown", category: "Prepared", confidence: 92, driver: "First Friday traffic", action: "Build cold case early, cap salad reorder at 60 units." },
  { store: "Mesa", category: "Produce", confidence: 88, driver: "July 4 festival", action: "Transfer bananas in, delay strawberry reorder by one day." },
  { store: "Tempe DC", category: "Dairy", confidence: 94, driver: "Stable replenishment", action: "Release yogurt allocation to Mesa before noon." }
];

export default function ForecastsPage() {
  const [scenario, setScenario] = useState<keyof typeof scenarios>("baseline");
  const adjusted = useMemo(() => {
    const lift = scenarios[scenario].lift;
    return fallbackForecasts.map((point) => ({
      ...point,
      forecast_units: Math.round(point.forecast_units * lift),
      lower_bound: Math.round(point.lower_bound * lift),
      upper_bound: Math.round(point.upper_bound * lift)
    }));
  }, [scenario]);

  const total = adjusted.reduce((sum, point) => sum + point.forecast_units, 0);

  return (
    <>
      <header className="pageHeader">
        <div>
          <span className="eyebrow">Forecast command</span>
          <h1>Model demand before teams place orders.</h1>
          <p>Compare scenarios across weather, event traffic, and current sales velocity so inventory decisions happen before spoilage or stockouts.</p>
        </div>
      </header>

      <section className="controlStrip">
        {Object.entries(scenarios).map(([key, value]) => (
          <button className={scenario === key ? "selected" : ""} key={key} onClick={() => setScenario(key as keyof typeof scenarios)}>
            {value.label}
          </button>
        ))}
      </section>

      <div className="grid4">
        <section className="metric navy"><span>Scenario demand</span><strong>{total}</strong></section>
        <section className="metric green"><span>Avg confidence</span><strong>91%</strong></section>
        <section className="metric orange"><span>Weather lift</span><strong>{scenario === "heat" ? "12%" : "8%"}</strong></section>
        <section className="metric purple"><span>Event lift</span><strong>{scenario === "festival" ? "20%" : "18%"}</strong></section>
      </div>

      <div className="grid2">
        <section className="panel">
          <h2><LineChart size={19} /> Seven-day scenario</h2>
          <ForecastChart points={adjusted} />
          <p>{scenarios[scenario].note}</p>
        </section>
        <section className="panel">
          <h2><CloudSun size={19} /> Demand drivers</h2>
          <div className="stackList">
            {storeRows.map((row) => (
              <article className="actionTile" key={row.store}>
                <small><MapPin size={14} /> {row.store} · {row.category}</small>
                <strong>{row.confidence}% confidence</strong>
                <span>{row.driver}</span>
                <p>{row.action}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
