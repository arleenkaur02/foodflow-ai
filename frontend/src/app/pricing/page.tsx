"use client";

import { useMemo, useState } from "react";
import { TimerReset } from "lucide-react";
import { fallbackInventory } from "@/lib/fallback";

const riskFloor = {
  conservative: 0.75,
  balanced: 0.55,
  aggressive: 0.42
};

export default function PricingPage() {
  const [mode, setMode] = useState<keyof typeof riskFloor>("balanced");
  const candidates = useMemo(
    () => fallbackInventory.filter((row) => row.spoilage_risk >= riskFloor[mode]),
    [mode]
  );
  const recovered = candidates.reduce((sum, row) => sum + row.quantity_on_hand * 1.85, 0);

  return (
    <>
      <header className="pageHeader">
        <div>
          <span className="eyebrow">Dynamic pricing</span>
          <h1>Markdown only when timing protects margin.</h1>
          <p>Choose a pricing posture and see which lots should move into markdown, donation reserve, or normal price monitoring.</p>
        </div>
      </header>

      <section className="controlStrip">
        {Object.keys(riskFloor).map((key) => (
          <button className={mode === key ? "selected" : ""} key={key} onClick={() => setMode(key as keyof typeof riskFloor)}>
            {key}
          </button>
        ))}
      </section>

      <div className="grid4">
        <section className="metric orange"><span>Markdown candidates</span><strong>{candidates.length}</strong></section>
        <section className="metric green"><span>Margin recoverable</span><strong>${Math.round(recovered)}</strong></section>
        <section className="metric purple"><span>Avg discount</span><strong>{mode === "aggressive" ? "22%" : mode === "balanced" ? "18%" : "12%"}</strong></section>
        <section className="metric navy"><span>Sell-through window</span><strong>36h</strong></section>
      </div>

      <table>
        <thead>
          <tr>
            <th>Lot</th>
            <th>Store</th>
            <th>Current risk</th>
            <th>Markdown</th>
            <th>Operational decision</th>
          </tr>
        </thead>
        <tbody>
          {fallbackInventory.map((row) => {
            const selected = row.spoilage_risk >= riskFloor[mode];
            const depth = row.spoilage_risk >= 0.8 ? "25%" : row.spoilage_risk >= 0.6 ? "18%" : "10%";
            return (
              <tr key={row.lot_code} className={selected ? "rowHighlight" : ""}>
                <td><strong>{row.product}</strong><br /><small>{row.lot_code}</small></td>
                <td>{row.store}</td>
                <td>{Math.round(row.spoilage_risk * 100)}%</td>
                <td>{selected ? depth : "Hold"}</td>
                <td><TimerReset size={15} /> {selected ? row.recommended_action : "Keep current price and monitor hourly sales velocity."}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
