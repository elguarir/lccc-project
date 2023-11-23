"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant={"outline"}
      size={"sm"}
      className="flex items-center w-full gap-2 min-w-fit"
      onClick={() => router.back()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5 rtl:rotate-180"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
        />
      </svg>
      <span>Go back</span>
    </Button>
  );
};

export default GoBackButton;
