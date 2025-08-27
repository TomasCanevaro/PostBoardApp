"use client";

import { useState } from "react";
import { apiFetch } from "../lib/api";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      alert("User registered! Please login.");
      location.href = "/login";
    } catch {
      alert("Registration failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-bold">Register</h1>
      <input className="w-full border p-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className="w-full border p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="w-full border p-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}
