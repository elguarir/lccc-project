"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Icons } from "@/assets/icons";
import { trpc } from "@/server/client";
import { toast } from "sonner";
import Link from "next/link";
import { Project } from "@prisma/client";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  project: Project;
}

export function ActionButtons({ project }: ActionButtonsProps) {
  const { mutate: deleteProjectMutation, isLoading } =
    trpc.project.deleteProject.useMutation();
  const { mutate: updateStatus } = trpc.project.updateStatus.useMutation();

  const utils = trpc.useContext();
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
          <Link href={`/dashboard/projects/${project.id}/edit`}>
            <Icons.EditIcon
              strokeWidth={3}
              className="w-4 h-4 mr-2 stroke-[2.2px]"
            />
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <>
              <span
                className={cn(
                  "w-2 h-2 mx-2 rounded-full",
                  project.status === "DRAFT" ? "bg-yellow-400" : "bg-green-500",
                )}
              />
              <span>Status</span>
            </>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="mr-1">
              <DropdownMenuItem
                onClick={() => {
                  updateStatus(
                    {
                      id: project.id,
                      status: "DRAFT",
                    },
                    {
                      onSuccess: () => {
                        toast("Status updated successfully!");
                        refresh();
                      },
                      onError: (err) => {
                        toast.error(err.message);
                      },
                    },
                  );
                }}
              >
                <div className="w-6">
                  {project.status === "DRAFT" && (
                    <Icons.check className="w-4 h-4 stroke-[2.2px]" />
                  )}
                </div>
                <span>DRAFT</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  updateStatus(
                    {
                      id: project.id,
                      status: "PUBLISHED",
                    },
                    {
                      onSuccess: () => {
                        toast("Status updated successfully!");
                        refresh();
                      },
                      onError: (err) => {
                        toast.error(err.message);
                      },
                    },
                  );
                }}
              >
                <div className="w-6">
                  {project.status === "PUBLISHED" && (
                    <Icons.check className="w-4 h-4 stroke-[2.2px]" />
                  )}
                </div>
                <span>PUBLISHED</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem
          asChild
          className="px-3 text-muted-foreground font-[450] py-2"
        >
          <Link href={`/projects/${project.slug}`}>
            <Icons.eyeVisible
              strokeWidth={3}
              className="w-4 h-4 mr-2 stroke-[2.2px]"
            />
            <span>View</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            deleteProjectMutation(
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
          className="px-3 py-2 font-[450] text-destructive
                   hover:text-red-600 focus:text-red-600"
        >
          <Icons.deleteTrashCan
            strokeWidth={3.5}
            className="w-4 h-4 mr-2 stroke-[2.2px]"
          />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
