import { BrainCircuit, CheckCircle2, Clock3, ShieldAlert } from "lucide-react";

const agents = [
  { name: "Demand Forecast Agent", status: "Healthy", confidence: 91, cadence: "Hourly", decision: "Raised prepared-food forecast for Downtown." },
  { name: "Spoilage Prediction Agent", status: "Needs review", confidence: 87, cadence: "Every 30 min", decision: "Flagged sourdough and bananas for action." },
  { name: "Inventory Optimization Agent", status: "Healthy", confidence: 89, cadence: "Hourly", decision: "Delayed Mesa strawberry reorder." },
  { name: "Dynamic Pricing Agent", status: "Healthy", confidence: 84, cadence: "Every 2 hours", decision: "Recommended 18-25% markdown range." },
  { name: "Store Redistribution Agent", status: "Healthy", confidence: 86, cadence: "Hourly", decision: "Proposed Mesa to Downtown banana transfer." },
  { name: "Donation Recommendation Agent", status: "Healthy", confidence: 93, cadence: "Daily and expiry-triggered", decision: "Reserved bakery donation window." }
];

export default function AgentsPage() {
  return (
    <>
      <header className="pageHeader">
        <div>
          <span className="eyebrow">AI agent control room</span>
          <h1>Monitor autonomous recommendations before execution.</h1>
          <p>Each agent has a business owner, confidence signal, refresh cadence, and latest decision so operators can trust the system.</p>
        </div>
      </header>

      <div className="agentGrid">
        {agents.map((agent) => (
          <article className="agentCard" key={agent.name}>
            <div className="agentTop">
              <BrainCircuit size={22} />
              <span className={agent.status === "Healthy" ? "status good" : "status review"}>
                {agent.status === "Healthy" ? <CheckCircle2 size={14} /> : <ShieldAlert size={14} />}
                {agent.status}
              </span>
            </div>
            <h2>{agent.name}</h2>
            <p>{agent.decision}</p>
            <div className="agentMeta">
              <span>{agent.confidence}% confidence</span>
              <span><Clock3 size={14} /> {agent.cadence}</span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
