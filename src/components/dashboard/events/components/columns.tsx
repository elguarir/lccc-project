"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import format from "date-fns/format";
import { statuses } from "../data/data";
import { Event } from "../data/schema";
import { DataTableColumnHeader } from "../../shared/Tables/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { CheckCircle, X } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Event>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "event",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Event" />
    ),
    cell: ({ row }) => {
      let event = row.getValue("event") as Event["event"];
      return (
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center w-16">
            {event.mainImage ? (
              <img
                src={event.mainImage}
                className="w-full h-full object-cover rounded-[4px] aspect-video"
              />
            ) : (
              <div className="flex border items-center justify-center w-full h-full rounded-[4px] aspect-video bg-muted">
                <QuestionMarkIcon className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="text-base font-medium truncate max-w-[300px]">
            {event.title}
          </div>
        </div>
      );
    },
    enableSorting: true,
    sortingFn: (rowA, rowB, id) => {
      let a = rowA.getValue(id) as Event["event"];
      let b = rowB.getValue(id) as Event["event"];
      return a.title.localeCompare(b.title);
    },
    filterFn: (row, id, value) => {
      let event = row.getValue("event") as Event["event"];
      let location = row.getValue("location") as Event["location"];
      return (
        event.title.toLowerCase().includes(value.toLowerCase()) ||
        location.toLowerCase().includes(value.toLowerCase())
      );
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-32">
          <span className="text-sm font-medium">
            {row.getValue("location")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="w-full"
        title="Status"
      />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <Badge variant={status.variant}>
            <status.icon className="w-3.5 min-w-fit h-3.5 mr-2" />
            {status.label}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "eventDate",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-[140px]"
        column={column}
        title="Event Date"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[120px] p-0 items-center">
          <span className="text-sm font-medium">
            {row.getValue("eventDate")
              ? format(new Date(row.getValue("eventDate")), "MMM dd, yyyy")
              : "N/A"}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
