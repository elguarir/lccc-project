"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {};

function SignOutButton({}: Props) {
  const router = useRouter();
  return (
    <Button
      onClick={() =>
        toast.promise(signOut(), {
          loading: "Logging out...",
          success: "Logged out!",
          error: "Error logging out",
        })
      }
      size={"xs"}
      className="w-full mt-3 mb-1"
    >
      <LogOut strokeWidth={2.3} className="w-4 h-4 mr-2" />
      <span>Log out</span>
    </Button>
  );
}

export default SignOutButton;
