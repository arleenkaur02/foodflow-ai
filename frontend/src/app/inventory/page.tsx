import { apiGet, type InventoryRow } from "@/lib/api";

function riskClass(risk: number) {
  if (risk >= 0.7) return "high";
  if (risk >= 0.45) return "med";
  return "low";
}

export default async function InventoryPage() {
  const rows = await apiGet<InventoryRow[]>("/api/inventory");

  return (
    <>
      <header className="pageHeader">
        <div>
          <span className="eyebrow">Real-time inventory</span>
          <h1>Lot-level spoilage prevention.</h1>
          <p>Prioritize the exact lots where shelf life, holding temperature, sales velocity, and remaining quantity create preventable waste.</p>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>Store</th>
            <th>Product</th>
            <th>Lot</th>
            <th>Qty</th>
            <th>Expiry</th>
            <th>Risk</th>
            <th>Recommended action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.lot_code}>
              <td>{row.store}</td>
              <td><strong>{row.product}</strong><br /><small>{row.sku} · {row.category}</small></td>
              <td>{row.lot_code}</td>
              <td>{row.quantity_on_hand}</td>
              <td>{row.expires_at}<br /><small>{row.days_to_expiry} days left</small></td>
              <td><span className={`risk ${riskClass(row.spoilage_risk)}`}>{Math.round(row.spoilage_risk * 100)}%</span></td>
              <td>{row.recommended_action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
