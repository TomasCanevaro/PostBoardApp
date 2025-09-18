import { apiFetch } from "../../lib/api";
import PostCard from "../../components/PostCard";

type User = {
  id: number;
  username: string;
  email: string;
  posts: { id: number; title: string; content: string; author: { id: number; username: string }; score: number; }[];
};

export default async function UserProfile({ params }: { params: { id: string } }) {
  const user = await apiFetch<User>(`/users/${params.id}`);

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded p-6 shadow">
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Posts</h2>
        <div className="space-y-4">
          {user.posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            user.posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </div>
    </div>
  );
}