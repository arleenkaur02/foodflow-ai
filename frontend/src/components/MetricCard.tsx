type MetricCardProps = {
  label: string;
  value: string;
  tone: "green" | "orange" | "purple" | "navy";
};

export function MetricCard({ label, value, tone }: MetricCardProps) {
  return (
    <section className={`metric ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </section>
  );
}
