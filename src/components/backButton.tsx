"use client";

import { ArrowLeftToLine } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton() {
  const router = useRouter();
  return (
    <button className="btn" onClick={() => router.back()}>
      <ArrowLeftToLine />
      Back
    </button>
  );
}
