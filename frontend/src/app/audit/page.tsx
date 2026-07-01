import { apiGet } from "@/lib/api";

type Audit = {
  actor: string;
  action: string;
  entity_type: string;
  entity_id: string;
  created_at: string;
};

export default async function AuditPage() {
  const rows = await apiGet<Audit[]>("/api/audit");
  return (
    <>
      <header className="pageHeader">
        <div>
          <span className="eyebrow">Audit logs</span>
          <h1>Trace every agent and operator action.</h1>
          <p>Food businesses need accountability for pricing, donations, transfers, and inventory adjustments.</p>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Actor</th>
            <th>Action</th>
            <th>Entity</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.actor}-${row.action}-${row.entity_id}`}>
              <td>{new Date(row.created_at).toLocaleString()}</td>
              <td>{row.actor}</td>
              <td>{row.action}</td>
              <td>{row.entity_type}<br /><small>{row.entity_id}</small></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
