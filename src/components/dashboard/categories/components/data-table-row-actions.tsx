"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categorySchema } from "../data/schema";
import { trpc } from "@/server/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  let category = categorySchema.parse(row.original);
  let { mutateAsync: deleteCategory } =
    trpc.category.deleteCategory.useMutation();

  let utils = trpc.useUtils();
  let refresh = () => {
    utils.category.getCategories.invalidate();
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
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/categories/${category.category.id}`}>
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            toast("Are you sure you want to delete this category?", {
              description:
                "This action cannot be undone, This will permanently delete this category.",
              action: {
                label: "Confirm",
                onClick: () =>
                  toast.promise(
                    deleteCategory(
                      { id: category.category.id },
                      {
                        onSuccess: () => {
                          refresh();
                        },
                      },
                    ),
                    {
                      loading: "Deleting category...",
                      success: "Category deleted!",
                      error: "Could not delete category",
                      duration: 1250,
                    },
                  ),
              },
            });
          }}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
