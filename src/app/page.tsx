import PostCard from "@/components/PostCard";
import { db } from "@/lib/db";

async function getPosts() {
  const response = await db.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      tag: true,
    },
  });
  return response;
}

export default async function Home() {
  const post = await getPosts();

  const res = await fetch(`${process.env.ENVIRONMENT}/api/post/get`, {
    cache: "no-cache",
  });
  const data = await res.json();
  console.log(data);

  return (
    <main className="grid items-center justify-center md:grid-cols-2 mt-10 gap-4">
      {post.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}
