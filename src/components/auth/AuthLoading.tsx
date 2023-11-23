"use client";
import React from "react";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

const AuthLoading = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ClerkLoading>
        <div className="flex items-center justify-center flex-1 h-full">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-[#657dcc] animate-spin" />
            <h1 className="mt-2 text-sm font-medium sr-only">Loading...</h1>
          </div>
        </div>
      </ClerkLoading>
      <ClerkLoaded>{children}</ClerkLoaded>
    </>
  );
};

export default AuthLoading;
