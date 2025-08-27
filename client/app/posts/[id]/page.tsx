import { apiFetch } from "../../lib/api";
import VoteButtons from "../../components/VoteButtons";

type Post = {
  id: number;
  title: string;
  content: string;
  author: { username: string };
  votes: { value: number }[];
};

export default async function PostDetail({ params }: { params: { id: string } }) {
  const post = await apiFetch<Post>(`/posts/${params.id}`);
  const voteCount = post.votes.reduce((sum, v) => sum + v.value, 0);

  return (
    <div className="border rounded p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-600">by {post.author.username}</p>
      <p className="mt-4">{post.content}</p>
      <div className="flex items-center justify-between mt-6">
        <VoteButtons postId={post.id} />
        <span className="text-sm font-semibold">Votes: {voteCount}</span>
      </div>
    </div>
  );
}
