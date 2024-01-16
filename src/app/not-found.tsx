import GoBackButton from "@/components/shared/GoBackButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function notFound() {
  return (
    <div className="absolute top-0  h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <div className="p-3 text-sm font-medium rounded-full text-primary bg-primary-50 dark:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            The page you are looking for doesn't exist. Here are some helpful
            links:
          </p>
          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <GoBackButton />
            <Button
              asChild
              size={"sm"}
              className="flex items-center w-full gap-2 min-w-fit"
            >
              <Link href={"/"}>Take me home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default notFound;
