"use client";

import { useRouter } from "next/navigation";
import { apiFetch } from "../lib/api";
import { authHeader } from "../lib/auth";

export default function VoteButtons({ postId }: { postId: number }) {
  const router = useRouter();

  async function vote(value: number) {
    try {
      await apiFetch(`/votes/${postId}`, {
        method: "POST",
        body: JSON.stringify({ value }),
        headers: Object.fromEntries(
          Object.entries(authHeader()).filter(([_, v]) => v !== undefined)
        ),
      });

      router.refresh(); //Re-fetch the page data
    } catch (err) {
      alert("Error voting");
    }
  }

  return (
    <div className="space-x-2">
      <button onClick={() => vote(1)} className="bg-green-500 px-2 py-1 rounded text-white">
        Upvote
      </button>
      <button onClick={() => vote(-1)} className="bg-red-500 px-2 py-1 rounded text-white">
        Downvote
      </button>
    </div>
  );
}