import Link from "next/link";
import { AlertTriangle, HandHeart, LineChart, Network, RefreshCw, Sparkles, Tags } from "lucide-react";
import { ForecastChart } from "@/components/ForecastChart";
import { MetricCard } from "@/components/MetricCard";
import { apiGet, type Dashboard, type ForecastPoint } from "@/lib/api";

export default async function DashboardPage() {
  const [dashboard, forecasts] = await Promise.all([
    apiGet<Dashboard>("/api/dashboard"),
    apiGet<ForecastPoint[]>("/api/forecasts")
  ]);

  return (
    <>
      <header className="pageHeader">
        <div>
          <span className="eyebrow">Autonomous operations</span>
          <h1>Prevent waste before it becomes shrink.</h1>
          <p>FoodFlow AI turns inventory, weather, events, shelf life, supplier constraints, and sales velocity into daily actions for operators.</p>
        </div>
        <a className="button" href="/inventory"><RefreshCw size={18} /> Review actions</a>
      </header>

      <div className="grid4">
        <MetricCard label="Waste at risk" value={`${dashboard.waste_at_risk_units} units`} tone="orange" />
        <MetricCard label="Recoverable margin" value={`$${dashboard.recoverable_margin.toLocaleString()}`} tone="green" />
        <MetricCard label="Donation ready" value={`${dashboard.donation_ready_units} units`} tone="purple" />
        <MetricCard label="Forecast accuracy" value={`${Math.round(dashboard.forecast_accuracy * 100)}%`} tone="navy" />
      </div>

      <section className="dashboardSwitchboard">
        {[
          { href: "/forecasts", icon: LineChart, title: "Forecast Command", body: "Compare demand drivers, confidence ranges, and forecast scenarios." },
          { href: "/pricing", icon: Tags, title: "Dynamic Pricing", body: "Tune markdown timing by spoilage risk, margin, and sell-through." },
          { href: "/redistribution", icon: Network, title: "Redistribution", body: "Match overstocked stores with locations that can absorb demand." },
          { href: "/donations", icon: HandHeart, title: "Donations", body: "Reserve safe food for partners before expiration windows close." },
          { href: "/agents", icon: Sparkles, title: "AI Agents", body: "Monitor agent status, confidence, and next scheduled decisions." }
        ].map(({ href, icon: Icon, title, body }) => (
          <Link className="switchCard" href={href} key={href}>
            <Icon size={20} />
            <strong>{title}</strong>
            <span>{body}</span>
          </Link>
        ))}
      </section>

      <div className="grid2">
        <section className="panel">
          <h2>Seven-day demand forecast</h2>
          <ForecastChart points={forecasts} />
        </section>
        <section className="panel">
          <h2>Agent recommendations</h2>
          <div className="recommendations">
            {dashboard.recommendations.map((rec) => (
              <article className={`rec ${rec.severity}`} key={rec.agent}>
                <small>{rec.agent}</small>
                <h3>{rec.title}</h3>
                <p>{rec.impact}</p>
                <strong><AlertTriangle size={15} /> {rec.action}</strong>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
