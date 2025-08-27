"use client";

import { useState } from "react";
import { apiFetch } from "../lib/api";
import { saveToken } from "../lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const data = await apiFetch<{ token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      saveToken(data.token);
      location.href = "/";
    } catch {
      alert("Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-bold">Login</h1>
      <input className="w-full border p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="w-full border p-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}