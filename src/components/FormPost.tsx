"use client";

import { FormInputPost } from "@/types";
import { Tag } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>;
  isEditing?: boolean;
  initialValue?: FormInputPost;
  isLoadingEdit?: boolean;
}

export const FormPost: FC<FormPostProps> = ({
  submit,
  isEditing,
  initialValue,
  isLoadingEdit,
}) => {
  const { register, handleSubmit } = useForm<FormInputPost>({
    defaultValues: initialValue,
  });

  // fecth
  const { isLoading, data } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await fetch("/api/tags");
      const res = await response.json();
      return res;
    },
  });

  return (
    <form
      className="flex flex-col items-center justify-center gap-5 mt-10"
      onSubmit={handleSubmit(submit)}
    >
      <input
        type="text"
        {...register("title", { required: true })}
        placeholder="Titulo"
        className="input input-bordered w-full max-w-lg"
      />

      <textarea
        className="textarea textarea-bordered w-full max-w-lg"
        {...register("content", { required: true })}
        placeholder="Descrição"
      ></textarea>

      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <select
          className="select select-bordered w-full max-w-lg"
          {...register("tagId", { required: true })}
          defaultValue={""}
        >
          <option disabled value="">
            Tags
          </option>
          {data?.map((tag) => (
            <option value={tag.id} key={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      )}
      <button type="submit" className="btn btn-primary w-full max-w-lg">
        Salvar
      </button>
    </form>
  );
};
