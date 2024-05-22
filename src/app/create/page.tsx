"use client";

import { FormPost } from "@/components/FormPost";
import BackButton from "@/components/backButton";
import { FormInputPost } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";

export default function Create() {
  const router = useRouter();
  const handleCreatePost: SubmitHandler<FormInputPost> = async (data: any) => {
    mutate(data);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (newPost: FormInputPost) => {
      return axios.post("/api/post/create", newPost);
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
      <BackButton />
      <h1 className="text-2xl">Adicionar post</h1>
      <FormPost submit={handleCreatePost} />
    </div>
  );
}
