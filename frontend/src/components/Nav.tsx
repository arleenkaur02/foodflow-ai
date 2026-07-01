import Link from "next/link";
import {
  Bell,
  Boxes,
  ClipboardList,
  Factory,
  HandHeart,
  LayoutDashboard,
  Leaf,
  LineChart,
  Network,
  ShieldCheck,
  Sparkles,
  Tags
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/forecasts", label: "Forecasts", icon: LineChart },
  { href: "/inventory", label: "Inventory", icon: Boxes },
  { href: "/pricing", label: "Pricing", icon: Tags },
  { href: "/redistribution", label: "Transfers", icon: Network },
  { href: "/donations", label: "Donations", icon: HandHeart },
  { href: "/agents", label: "AI Agents", icon: Sparkles },
  { href: "/suppliers", label: "Suppliers", icon: Factory },
  { href: "/notifications", label: "Alerts", icon: Bell },
  { href: "/audit", label: "Audit", icon: ClipboardList },
  { href: "/about", label: "About", icon: Leaf }
];

export function Nav() {
  return (
    <aside className="sidebar">
      <Link className="brand" href="/dashboard" aria-label="FoodFlow AI dashboard">
        <span className="brandMark"><ShieldCheck size={22} /></span>
        <span>
          <strong>FoodFlow AI</strong>
          <small>Waste prevention OS</small>
        </span>
      </Link>
      <nav>
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
