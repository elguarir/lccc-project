"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import format from "date-fns/format";
import { Category } from "../data/schema";
import { DataTableColumnHeader } from "../../shared/Tables/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Category>[] = [
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
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      let category = row.getValue("category") as Category["category"];
      return (
        <div className="flex items-center">
          <div className="text-base font-medium truncate max-w-[300px]">
            {category.title}
          </div>
        </div>
      );
    },
    enableSorting: true,
    sortingFn: (rowA, rowB, id) => {
      let a = rowA.getValue(id) as Category["category"];
      let b = rowB.getValue(id) as Category["category"];
      return a.title.localeCompare(b.title);
    },
    filterFn: (row, id, value) => {
      let category = row.getValue(id) as Category["category"];
      let slug = row.getValue("slug") as Category["slug"];
      return category.title.includes(value) || slug.includes(value);
    },
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm max-w-[250px] truncate font-medium">
          {row.getValue("slug")}
        </div>
      );
    },
  },
  {
    accessorKey: "articleCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number of articles" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm font-medium text-center w-fit">
          {row.getValue("articleCount")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-[140px]"
        column={column}
        title="Created At"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[120px] p-0 items-center">
          <span className="text-sm font-medium">
            {row.getValue("createdAt")
              ? format(new Date(row.getValue("createdAt")), "MMM dd, yyyy")
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
