"use client";

import { FormEvent, useState } from "react";
import { API_URL } from "@/lib/api";

export default function LoginPage() {
  const [message, setMessage] = useState("Use ops@foodflow.ai / FoodFlow!2026");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.get("email"), password: data.get("password") })
    });
    setMessage(res.ok ? "Authenticated. Token issued by API." : "Invalid credentials.");
  }

  return (
    <div className="loginShell">
      <form className="loginBox" onSubmit={submit}>
        <span className="eyebrow">Secure access</span>
        <h1>Sign in</h1>
        <label>Email<input name="email" type="email" defaultValue="ops@foodflow.ai" /></label>
        <label>Password<input name="password" type="password" defaultValue="FoodFlow!2026" /></label>
        <button className="button" type="submit">Authenticate</button>
        <p>{message}</p>
      </form>
    </div>
  );
}
