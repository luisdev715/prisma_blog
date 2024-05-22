import ButtonAction from "@/components/ButtonAction";
import BackButton from "@/components/backButton";
import { db } from "@/lib/db";
import React, { FC } from "react";

interface PostDetailPageProps {
  params: {
    id: string;
  };
}
async function getPost(id: string) {
  const response = await db.post.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      tag: true,
    },
  });
  return response;
}

const PostDetailPage: FC<PostDetailPageProps> = async ({ params }) => {
  const post = await getPost(params.id);
  return (
    <>
      <BackButton />
      <div className="mb-8">
        <h2 className="text-2xl font-bold my-4">{post?.title}</h2>
      </div>
      <div className="badge badge-primary badge-outline">{post?.tag.name}</div>
      <p className="text-slate-700">{post?.content}</p>
      <ButtonAction id={params.id} />
    </>
  );
};

export default PostDetailPage;
