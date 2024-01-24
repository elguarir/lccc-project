"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/server/client";
import { toast } from "sonner";
import { userSchema } from "../data/schema";
import { useAuth } from "@clerk/nextjs";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  let user = userSchema.parse(row.original);
  let { mutateAsync: deleteUser } = trpc.user.deleteUser.useMutation();
  let { mutateAsync: updateUser } = trpc.user.updateUserRole.useMutation();
  let utils = trpc.useUtils();
  let refresh = () => {
    utils.user.getUsersList.invalidate();
  };
  let { isLoaded, userId } = useAuth();

  return (
    <>
      <DropdownMenu modal>
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
            <Link
              prefetch={true}
              className="outline-none focus:ring-0 ring-0 focus:outline-none"
              href={`/dashboard/members/${user.id}`}
            >
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger disabled={isLoaded && user.id === userId}>
              Role
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent sideOffset={7}>
              <DropdownMenuRadioGroup value={user.role}>
                <DropdownMenuRadioItem
                  key="admin"
                  value="admin"
                  onClick={() => {
                    toast.promise(
                      updateUser(
                        {
                          id: user.id,
                          role: "admin",
                        },
                        {
                          onSuccess: () => {
                            refresh();
                          },
                        },
                      ),
                      {
                        loading: "Updating user...",
                        success: "User updated!",
                        error: "Could not update user",
                        duration: 1250,
                      },
                    );
                  }}
                >
                  Admin
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  key="user"
                  value="user"
                  onClick={() => {
                    toast.promise(
                      updateUser(
                        {
                          id: user.id,
                          role: "user",
                        },
                        {
                          onSuccess: () => {
                            refresh();
                          },
                        },
                      ),
                      {
                        loading: "Updating user...",
                        success: "User updated!",
                        error: "Could not update user",
                        duration: 1250,
                      },
                    );
                  }}
                >
                  Member
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem
            onClick={() => {
              toast("Are you sure you want to delete this user?", {
                description:
                  "This action cannot be undone, and will delete all of this user's data.",
                action: {
                  label: "Confirm",
                  onClick: () =>
                    toast.promise(
                      deleteUser(
                        { id: user.id },
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
                    ),
                },
              });
            }}
            disabled={isLoaded && user.id === userId}
          >
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
