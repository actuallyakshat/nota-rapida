"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      className="text-sm font-medium hover:underline"
      onClick={() => router.back()}
    >
      Go Back
    </button>
  );
}
