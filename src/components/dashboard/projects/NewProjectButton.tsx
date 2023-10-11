"use client";
import { Button } from "@/components/ui/button";
import { trpc } from "@/server/client";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const NewProjectButton = () => {
  const { mutate: CreateArticle, isLoading } =
    trpc.article.draftArticle.useMutation();
  const router = useRouter();
  return (
    <Button
      loadingText="Creating..."
      isLoading={isLoading}
      size={"sm"}
      onClick={() => {
        CreateArticle(
          {},
          {
            onSuccess: (article) => {
              toast("Article created successfully, redirecting to editor...");
              router.push(`/editor/${article.id}`);
            },
          },
        );
      }}
    >
      <PlusIcon strokeWidth={2.5} className="w-4 h-4 mr-2" />
      New Project
    </Button>
  );
};

export default NewProjectButton;
