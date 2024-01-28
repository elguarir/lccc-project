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
import { eventSchema } from "../data/schema";
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
  let event = eventSchema.parse(row.original);
  let { mutateAsync: updateStatus } =
    trpc.event.updateEventStatus.useMutation();
  let { mutateAsync: deleteEvent } = trpc.event.deleteEvent.useMutation();

  let router = useRouter();
  let utils = trpc.useUtils();
  let refresh = () => {
    utils.event.getEvents.invalidate();
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
          <Link href={`/dashboard/events/${event.event.id}/edit`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent sideOffset={7}>
            <DropdownMenuRadioGroup value={event.status}>
              <DropdownMenuRadioItem
                key="draft"
                value="draft"
                onClick={() => {
                  toast.promise(
                    updateStatus(
                      { id: event.event.id, status: "draft" },
                      {
                        onSuccess: () => {
                          refresh();
                        },
                      },
                    ),
                    {
                      loading: "Updating status...",
                      success: "Status updated!",
                      error: "Failed to update status",
                      duration: 1250,
                    },
                  );
                }}
              >
                Draft
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                key="published"
                value="published"
                onClick={() => {
                  toast.promise(
                    updateStatus(
                      { id: event.event.id, status: "published" },
                      {
                        onSuccess: () => {
                          refresh();
                        },
                      },
                    ),
                    {
                      loading: "Updating status...",
                      success: "Status updated!",
                      error: "Failed to update status",
                      duration: 1250,
                    },
                  );
                }}
              >
                Published
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem
          onClick={() => {
            toast("Are you sure you want to delete this event?", {
              description:
                "This action cannot be undone, This will permanently delete this event.",
              action: {
                label: "Confirm",
                onClick: () =>
                  toast.promise(
                    deleteEvent(
                      { id: event.event.id },
                      {
                        onSuccess: () => {
                          refresh();
                        },
                      },
                    ),
                    {
                      loading: "Deleting event...",
                      success: "Event deleted!",
                      error: "Could not delete event",
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
