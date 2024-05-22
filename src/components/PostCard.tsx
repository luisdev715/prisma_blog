import { Tag } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    tag: Tag;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const { title, content, tag } = post;
  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{content}</p>
        <div className="badge badge-primary badge-outline">{tag.name}</div>
        <button className="hover:underline card-actions justify-end">
          <Link className="btn" href={`/post/${post.id}`}>
            Read more
          </Link>
        </button>
      </div>
    </div>
  );
}
