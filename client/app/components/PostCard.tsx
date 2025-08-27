"use client";

import Link from "next/link";
import VoteButtons from "./VoteButtons";

type Post = {
  id: number;
  title: string;
  content: string;
  author: { username: string };
  votes: { value: number }[];
};

export default function PostCard({ post }: { post: Post }) {
  const voteCount = (post.votes ?? []).reduce((sum, v) => sum + v.value, 0);

  return (
    <div className="border rounded p-4 shadow-md">
      <h2 className="text-xl font-bold">
        <Link href={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p className="text-sm text-gray-600">by {post.author.username}</p>
      <p className="mt-2">{post.content}</p>
      <div className="flex items-center justify-between mt-3">
        <VoteButtons postId={post.id} />
        <span className="text-sm font-semibold">Votes: {voteCount}</span>
      </div>
    </div>
  );
}