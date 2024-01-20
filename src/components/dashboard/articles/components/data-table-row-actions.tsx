"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { articleSchema } from "../data/schema";
import { trpc } from "@/server/client";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  let article = articleSchema.parse(row.original);
  let { mutateAsync: deleteArticle } = trpc.article.deleteArticle.useMutation();
  let { mutateAsync: duplicateArticle } =
    trpc.article.duplicateArticle.useMutation();
  let utils = trpc.useUtils();

  let refresh = () => {
    utils.article.getUserArticles.invalidate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            toast.promise(
              duplicateArticle(
                {
                  id: article.id,
                },
                {
                  onSuccess: () => {
                    refresh();
                  },
                },
              ),
              {
                loading: "Duplicating article...",
                success: "Article duplicated!",
                error: "Could not duplicate article",
                duration: 1250,
              },
            );
          }}
        >
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            toast.promise(
              deleteArticle(
                {
                  id: article.id,
                },
                {
                  onSuccess: () => {
                    refresh();
                  },
                },
              ),
              {
                loading: "Deleting article...",
                success: "Article deleted!",
                error: "Could not delete article",
                duration: 1250,
              },
            );
          }}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
