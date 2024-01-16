"use client";
import { Button } from "@/components/ui/button";
import { trpc } from "@/server/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const AddNew = () => {
  const { mutate: create, isLoading } = trpc.article.createDraft.useMutation();
  const router = useRouter();
  return (
    <Button
      size={"sm"}
      className="flex items-center justify-center px-4"
      onClick={() =>
        create(
          {},
          {
            onSuccess: (data) => {
              toast.success("Article created successfully, redirecting...");
              router.push(`/editor/${data.id}`);
            },
            onError: (error) => {
              toast.error(error.message);
            },
          },
        )
      }
      isLoading={isLoading}
      loadingText="Creating..."
    >
      <span className="mr-2">New</span>
      <Plus className="w-4 h-4" />
    </Button>
  );
};

export default AddNew;
