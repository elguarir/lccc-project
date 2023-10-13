"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Icons } from "@/assets/icons";
import { UserArticlesType } from "@/types/article";
import { trpc } from "@/server/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Project } from "@prisma/client";

interface ActionButtonsProps {
  project: Project;
}

export function ActionButtons({ project }: ActionButtonsProps) {
  const utils = trpc.useContext();
  const { mutate: deletePostMutation, isLoading } =
    trpc.project.deleteProject.useMutation();

  const { mutate: duplicatePostMutation, isLoading: DuplicateLoading } =
    trpc.article.duplicateArticle.useMutation();

  const refresh = () => {
    utils.project.getProjects.invalidate();
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
        <DropdownMenuItem
          asChild
          className="px-3 text-muted-foreground font-[450] py-2"
        >
          <Link href={`/articles/`}>
            <Icons.eyeVisible
              strokeWidth={3}
              className="w-4 h-4 mr-2 stroke-[2.2px]"
            />
            <span>View Article</span>
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem
          onClick={() => {
            duplicatePostMutation(
              {
                articleId: article.id,
              },
              {
                onSuccess: () => {
                  toast("Article duplicated successfully!");
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
        </DropdownMenuItem> */}
        <DropdownMenuItem
          onClick={() => {
            deletePostMutation(
              {
                id: project.id,
              },
              {
                onSuccess: () => {
                  toast("Project deleted successfully!");
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
