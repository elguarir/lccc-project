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
import { trpc } from "@/server/client";
import { toast } from "sonner";
import { userSchema } from "../data/schema";
import { useAuth } from "@clerk/nextjs";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  let user = userSchema.parse(row.original);
  let { mutateAsync: deleteUser } = trpc.user.deleteUser.useMutation();
  let utils = trpc.useUtils();
  let refresh = () => {
    utils.user.getUsersList.invalidate();
  };
  let { isLoaded, userId } = useAuth();
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
        <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>

        <DropdownMenuItem
          disabled={isLoaded && user.id === userId}
          onClick={() => {
            toast.promise(
              deleteUser(
                {
                  id: user.id,
                },
                {
                  onSuccess: () => {
                    refresh();
                  },
                },
              ),
              {
                loading: "Deleting user...",
                success: "User deleted!",
                error: "Could not delete user",
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
