import { apiFetch } from "./lib/api";
import PostCard from "./components/PostCard";

export default async function Home() {
  const posts = await apiFetch<any[]>("/posts");

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}