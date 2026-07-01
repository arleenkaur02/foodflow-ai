"use client";

import { useMemo, useState } from "react";
import { ArrowRightLeft, Route } from "lucide-react";

const transfers = [
  { from: "Mesa", to: "Downtown", sku: "PRD-ORG-BAN-3LB", units: 36, drive: 28, impact: "$126 margin saved", priority: "High", status: "Dispatch by 11:30" },
  { from: "Tempe DC", to: "Mesa", sku: "DRY-GRK-YOG-32", units: 48, drive: 19, impact: "Avoid 14 lost sales", priority: "Medium", status: "Load with noon route" },
  { from: "Downtown", to: "Valley Community Kitchen", sku: "BAK-SRD-LOAF", units: 22, drive: 12, impact: "Donation before stale window", priority: "High", status: "Hold for 14:00 pickup" }
];

export default function RedistributionPage() {
  const [maxDrive, setMaxDrive] = useState(30);
  const visible = useMemo(() => transfers.filter((transfer) => transfer.drive <= maxDrive), [maxDrive]);

  return (
    <>
      <header className="pageHeader">
        <div>
          <span className="eyebrow">Store redistribution</span>
          <h1>Move inventory where demand can absorb it.</h1>
          <p>Balance spoilage risk, demand gaps, route distance, and donation windows before placing another supplier order.</p>
        </div>
      </header>

      <section className="sliderPanel">
        <label>
          Route limit: {maxDrive} minutes
          <input type="range" min="10" max="45" value={maxDrive} onChange={(event) => setMaxDrive(Number(event.target.value))} />
        </label>
      </section>

      <div className="routeBoard">
        {visible.map((transfer) => (
          <article className="routeCard" key={`${transfer.from}-${transfer.to}-${transfer.sku}`}>
            <small>{transfer.priority} priority</small>
            <h2>{transfer.from} → {transfer.to}</h2>
            <p><ArrowRightLeft size={15} /> {transfer.units} units · {transfer.sku}</p>
            <p><Route size={15} /> {transfer.drive} min route · {transfer.impact}</p>
            <strong>{transfer.status}</strong>
          </article>
        ))}
      </div>
    </>
  );
}
