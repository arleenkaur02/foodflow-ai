"use client";

import { useState } from "react";
import { HandHeart, PackageCheck } from "lucide-react";

const partners = [
  { name: "Valley Community Kitchen", city: "Phoenix", window: "14:00-17:00", capacity: 180, reserved: 61, categories: "Produce, Bakery, Prepared" },
  { name: "East Valley Food Rescue", city: "Mesa", window: "09:00-12:00", capacity: 220, reserved: 84, categories: "Produce, Dairy, Bakery" },
  { name: "Campus Pantry Network", city: "Tempe", window: "16:00-19:00", capacity: 140, reserved: 48, categories: "Dairy, Prepared" }
];

export default function DonationsPage() {
  const [showReserved, setShowReserved] = useState(true);
  const total = partners.reduce((sum, partner) => sum + (showReserved ? partner.reserved : partner.capacity - partner.reserved), 0);

  return (
    <>
      <header className="pageHeader">
        <div>
          <span className="eyebrow">Donation operations</span>
          <h1>Send safe food to partners while it is still useful.</h1>
          <p>Donation planning connects lot-level expiry, partner category rules, pickup windows, and daily capacity.</p>
        </div>
      </header>

      <section className="controlStrip">
        <button className={showReserved ? "selected" : ""} onClick={() => setShowReserved(true)}>Reserved</button>
        <button className={!showReserved ? "selected" : ""} onClick={() => setShowReserved(false)}>Open capacity</button>
      </section>

      <div className="grid4">
        <section className="metric green"><span>{showReserved ? "Reserved units" : "Open capacity"}</span><strong>{total}</strong></section>
        <section className="metric orange"><span>Pickup windows</span><strong>3</strong></section>
        <section className="metric purple"><span>Partner cities</span><strong>3</strong></section>
        <section className="metric navy"><span>Safe categories</span><strong>5</strong></section>
      </div>

      <div className="routeBoard">
        {partners.map((partner) => (
          <article className="routeCard" key={partner.name}>
            <small><HandHeart size={14} /> {partner.city}</small>
            <h2>{partner.name}</h2>
            <p><PackageCheck size={15} /> {partner.categories}</p>
            <p>{partner.window} · {partner.reserved}/{partner.capacity} units reserved</p>
            <div className="capacityBar"><span style={{ width: `${(partner.reserved / partner.capacity) * 100}%` }} /></div>
          </article>
        ))}
      </div>
    </>
  );
}
