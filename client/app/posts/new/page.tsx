"use client";

import { useState } from "react";
import { apiFetch } from "../../lib/api";
import { authHeader } from "../../lib/auth";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const auth = authHeader();
      const headers: HeadersInit = auth.Authorization
        ? { Authorization: auth.Authorization }
        : {};
      await apiFetch("/posts", {
        method: "POST",
        headers,
        body: JSON.stringify({ title, content }),
      });
      location.href = "/";
    } catch {
      alert("Failed to create post");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto mt-10">
      <h1 className="text-xl font-bold">New Post</h1>
      <input className="w-full border p-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="w-full border p-2 h-40" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Create</button>
    </form>
  );
}
