import { apiGet } from "@/lib/api";

type Notification = {
  id: string;
  severity: string;
  title: string;
  body: string;
  created_at: string;
  acknowledged: boolean;
};

export default async function NotificationsPage() {
  const rows = await apiGet<Notification[]>("/api/notifications");
  return (
    <>
      <header className="pageHeader">
        <div>
          <span className="eyebrow">Notifications</span>
          <h1>Exception-driven operations.</h1>
          <p>Alerts focus teams on spoilage windows, transfer opportunities, supplier risk, and high-impact daily decisions.</p>
        </div>
      </header>
      <div className="recommendations">
        {rows.map((row) => (
          <article className={`rec ${row.severity}`} key={row.id}>
            <small>{new Date(row.created_at).toLocaleString()} · {row.severity}</small>
            <h3>{row.title}</h3>
            <p>{row.body}</p>
          </article>
        ))}
      </div>
    </>
  );
}
