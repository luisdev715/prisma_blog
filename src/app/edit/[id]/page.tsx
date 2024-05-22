"use client";

import { FormPost } from "@/components/FormPost";
import BackButton from "@/components/backButton";
import { FormInputPost } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default function EditPostPage(props: EditPostPageProps) {
  const router = useRouter();
  const { id } = props.params;

  const { data: dataPost, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axios.get(`/api/post/${id}`);
      return res.data;
    },
  });

  const { mutate: editPost, isLoading: isLoadingEdit } = useMutation({
    mutationFn: (newPost: FormInputPost) => {
      return axios.patch(`/api/post/${id}`, newPost);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  const handleEditPost: SubmitHandler<FormInputPost> = (data: any) => {
    console.log(data);
    editPost(data);
  };

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <span className="loading loading-lg"></span>;
      </div>
    );
  }
  return (
    <div>
      <BackButton />
      <h1 className="text-2xl">Editar post</h1>
      <FormPost
        initialValue={dataPost}
        submit={handleEditPost}
        isEditing
        isLoadingEdit
      />
    </div>
  );
}
