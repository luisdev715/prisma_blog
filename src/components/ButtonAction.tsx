"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use } from "react";

interface ButtonActionProps {
  id: string | undefined;
}

export default function ButtonAction({ id }: ButtonActionProps) {
  const router = useRouter();

  const { mutate: deletePost } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/post/${id}`);
    },
    onError: () => {
      alert("erro");
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  return (
    <div>
      <Link href={`/edit/${id}`} className="btn mr-2">
        <Pencil />
        Edit
      </Link>
      <button onClick={() => deletePost()} className="btn btn-error">
        <Trash2 />
        Delete
      </button>
    </div>
  );
}
