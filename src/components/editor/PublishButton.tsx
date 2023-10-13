"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

import { useEditorStore } from "@/store/EditorStore";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { trpc } from "@/server/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  disabled?: boolean;
};

const PublishButton = ({ disabled }: Props) => {
  const article = useEditorStore((state) => state.article);
  const syncArticle = useEditorStore((state) => state.syncArticle);
  const router = useRouter();
  const { mutate: updatePost, isLoading } =
    trpc.article.changeStatus.useMutation();
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    console.log(isLoading)
  }, [isLoading])

  if (article?.status === "DRAFT") {
    return (
      <Button
      size={"sm"}
      isLoading={isLoading}
      loadingText="Publishing..."
        onClick={() => {
          if (article) {
            if(!article.publishedAt) {
              toast.error("Please set a publish date before publishing the article.");
              return;
            }
            updatePost(
              {
                articleId: article.id,
                status: "PUBLISHED",
              },
              {
                onSuccess(data) {
                  console.log(data)
                  syncArticle();
                  toast("Article published successfully!", {
                    action: {
                      label: "View Article",
                      onClick: () =>
                        router.push(`/articles/${data.article.slug}`),
                    },
                  });
                },
              },
            );
          }
        }}
      >
        Publish
      </Button>
    );
  } else if (article?.status === "PUBLISHED") {
    return (
      <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
        <AlertDialogTrigger asChild>
          <Button size={"sm"} disabled={disabled} variant="ghost">
            Unpublish
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="outline-none rounded-lg max-sm:max-w-[96%]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-left">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-left">
              This will unpublish your article and make it unavailable to the
              public.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row items-center justify-end m-0 space-x-2">
            <AlertDialogCancel className="m-0">Cancel</AlertDialogCancel>
            <Button
              isLoading={isLoading}
              loadingText="Unpublishing..."
              onClick={async () => {
                if (article) {
                  updatePost(
                    {
                      articleId: article.id,
                      status: "DRAFT",
                    },
                    {
                      onSuccess(data) {
                        syncArticle();
                        setModalOpen(false);
                      },
                    },
                  );
                }
              }}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else return null;
};

export default PublishButton;
