"use client";

import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  author: { id: number; username: string };
  score: number;
}

export default function PostCard({ post }: { post: Post }) {
  const voteCount = post.score ?? 0;
  const currentUserId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  return (
    <div className="border rounded p-4 shadow-md">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-700">{post.content}</p>
      <p className="text-sm text-gray-500">
        By{" "}
        <Link
          href={`/users/${post.author.id}`}
          className="hover:underline text-blue-600"
        >
          {post.author.username}
        </Link>
      </p>
      <p className="mt-2 font-semibold">Votes: {voteCount}</p>

      {String(post.author.id) === currentUserId && (
        <Link
          href={`/posts/${post.id}/edit`}
          className="text-blue-500 hover:underline text-sm ml-2"
        >
          Edit
        </Link>
      )}
    </div>
  );
}