"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";
import { authHeader } from "../../../lib/auth";
import { useParams } from "next/navigation";

export default function EditPostPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function loadPost() {
      const data = await apiFetch(`/posts/${id}`);
      const post = data as { title: string; content: string };
      setTitle(post.title);
      setContent(post.content);
    }
    loadPost();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const auth = authHeader();
      const headers: HeadersInit = auth.Authorization
        ? { Authorization: auth.Authorization }
        : {};
      await apiFetch(`/posts/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ title, content }),
      });
      location.href = `/posts/${id}`;
    } catch {
      alert("Update failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto mt-10">
      <h1 className="text-xl font-bold">Edit Post</h1>
      <input className="w-full border p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="w-full border p-2 h-40" value={content} onChange={(e) => setContent(e.target.value)} />
      <button className="bg-yellow-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
