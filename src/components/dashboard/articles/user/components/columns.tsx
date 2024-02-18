"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import format from "date-fns/format";
import { statuses } from "../data/data";
import { Article } from "../data/schema";
import { DataTableColumnHeader } from "../../../shared/Tables/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { CheckCircle, X } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Article>[] = [
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
    accessorKey: "id",
    header: ({ column }) => null,
    cell: ({ row }) => null,
    enableSorting: false,
    enableHiding: false,
    maxSize: 0,
  },
  {
    accessorKey: "coverImage",
    header: ({ column }) => null,
    cell: ({ row }) => {
      let imgUrl = row.getValue("coverImage") as string | undefined;
      return (
        <div className="flex items-center justify-center w-16">
          {imgUrl ? (
            <img
              src={imgUrl}
              className="w-full h-full object-cover rounded-[4px] border aspect-video"
            />
          ) : (
            <div className="flex border items-center justify-center w-full h-full rounded-[4px] aspect-video bg-muted">
              <QuestionMarkIcon className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Link
            href={`/editor/${row.getValue("id")}`}
            className="max-w-[310px] truncate font-medium hover:text-primary"
          >
            {row.getValue("title")}
          </Link>
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
        <div className="flex items-center w-fit">
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
    accessorKey: "approved",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approved" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[50px] items-center">
          {row.getValue("approved") ? (
            <div className="p-1 bg-green-600 rounded-sm w-fit h-fit">
              <CheckCircle className="w-4 h-4 text-neutral-100" />
            </div>
          ) : (
            <div className="p-1 bg-red-600 rounded-sm w-fit h-fit">
              <X className="w-4 h-4 text-neutral-100" />
            </div>
          )}
        </div>
      );
    },

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "publishedAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-[140px]"
        column={column}
        title="Published At"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[120px] p-0 items-center">
          <span className="text-sm font-medium">
            {row.getValue("publishedAt")
              ? format(new Date(row.getValue("publishedAt")), "MMM dd, yyyy")
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
