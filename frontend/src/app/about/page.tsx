const sections = [
  ["The global food waste problem", "Nearly one-third of food produced globally never reaches a plate. For operators, that shows up as margin leakage, volatile ordering, disposal cost, higher consumer prices, and avoidable emissions."],
  ["Why existing systems fail", "Legacy inventory tools record what happened after it happened. They rarely combine demand, weather, events, shelf life, supplier lead times, local transfer capacity, and donation windows into one decision loop."],
  ["How FoodFlow AI solves it", "FoodFlow AI runs specialized agents for demand, spoilage, optimization, pricing, redistribution, and donation. Each agent turns operational signals into timely actions that protect margin and reduce waste."],
  ["AI architecture", "The platform uses time-series forecasting, rules-based safety constraints, vector-search-ready operational context, audit trails, and optional OpenAI summaries so teams can understand why each action was recommended."],
  ["Technologies used", "FastAPI, PostgreSQL, Redis, Next.js, TypeScript, JWT authentication, Docker, GitHub Actions, and modular Python services form a deployable foundation for enterprise food operations."],
  ["Scalability", "FoodFlow AI is designed around store-level data partitions, cacheable agent outputs, background refresh workers, and API contracts that can support multi-region grocery, restaurants, and distribution networks."],
  ["Future roadmap", "Next milestones include purchase-order automation, computer-vision shelf checks, route-aware redistribution, EDI supplier integrations, carbon accounting exports, and partner donation marketplace workflows."],
  ["Environmental impact", "Reducing preventable spoilage lowers methane-producing landfill waste, embedded water loss, and unnecessary freight emissions from replacement inventory."],
  ["Social impact", "Donation recommendations help move safe food to community partners while there is still time to use it, creating a practical bridge between commercial operations and food access."],
  ["Business value", "Operators recover margin through better markdown timing, fewer stockouts, smarter ordering, lower disposal cost, stronger supplier discipline, and a clear audit trail for every decision."]
];

export default function AboutPage() {
  return (
    <>
      <section className="aboutHero">
        <div>
          <span className="eyebrow">FoodFlow AI</span>
          <h1>The operating system for intelligent food waste prevention.</h1>
          <p>Built for grocers, supermarkets, restaurants, and distributors that need predictive action, not another dashboard of yesterday’s losses.</p>
        </div>
      </section>
      <div className="aboutGrid">
        {sections.map(([title, body]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </section>
        ))}
      </div>
    </>
  );
}
