import type { ForecastPoint } from "@/lib/api";

export function ForecastChart({ points }: { points: ForecastPoint[] }) {
  const max = Math.max(...points.map((point) => point.upper_bound), 1);
  return (
    <div className="chart" aria-label="Seven day demand forecast">
      {points.map((point) => (
        <div className="barGroup" key={point.date}>
          <div className="barTrack">
            <span className="range" style={{ height: `${(point.upper_bound / max) * 100}%` }} />
            <span className="bar" style={{ height: `${(point.forecast_units / max) * 100}%` }} />
          </div>
          <strong>{new Date(point.date).toLocaleDateString("en-US", { weekday: "short" })}</strong>
          <small>{point.forecast_units}</small>
        </div>
      ))}
    </div>
  );
}
