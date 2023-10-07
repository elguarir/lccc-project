"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Icons } from "@/assets/icons";
import { UserArticlesType } from "@/types/article";
import { trpc } from "@/server/client";
import { toast } from "sonner";

interface ActionButtonsProps {
  article: UserArticlesType[0];
}

export function ActionButtons({ article }: ActionButtonsProps) {
  const utils = trpc.useContext();
  const { mutate: deletePostMutation, isLoading } =
    trpc.article.deleteArticle.useMutation();

  const { mutate: duplicatePostMutation, isLoading: DuplicateLoading } =
    trpc.article.duplicateArticle.useMutation();

  const refresh = () => {
    utils.article.userArticles.invalidate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="p-0 outline-none w-7 h-7 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 "
          variant={"secondary"}
        >
          <Icons.moreIcon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="mt-1 py-2 w-[220px] rounded-xl px-3"
      >
        <DropdownMenuLabel className="text-base">
          Article Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="px-3 text-muted-foreground font-[450] py-2">
            <Icons.viewing className="w-4 h-4 mr-2 stroke-[2.2px]" />
            <span>View Article</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="px-3 text-muted-foreground font-[450] py-2">
            <Icons.EditIcon className="w-4 h-4 mr-2 stroke-[2.2px]" />
            <span>Quick Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              duplicatePostMutation(
                {
                  articleId: article.id,
                },
                {
                  onSuccess: () => {
                    toast.success("Article duplicated successfully!");
                    refresh();
                  },
                  onError: (err) => {
                    toast.error(err.message);
                  },
                },
              );
            }}
            className="px-3 text-muted-foreground font-[450] py-2"
          >
            <Icons.clipBoardCopy className="w-4 h-4 mr-2 stroke-[2.2px]" />
            <span>Duplicate</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              deletePostMutation(
                {
                  articleId: article.id,
                },
                {
                  onSuccess: () => {
                    toast.success("Article deleted successfully!");
                    refresh();
                  },
                  onError: (err) => {
                    toast.error(err.message);
                  },
                },
              );
            }}
            className="px-3 py-2 text-destructive hover:text-red-600 focus:text-red-600"
          >
            <Icons.deleteTrashCan className="w-4 h-4 mr-2 stroke-[2.2px]" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
