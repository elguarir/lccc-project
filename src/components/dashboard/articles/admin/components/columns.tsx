"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { statuses } from "../data/data";
import { Article } from "../data/schema";
import { DataTableColumnHeader } from "../../../shared/Tables/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, X } from "lucide-react";

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
    accessorKey: "article",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Article" />
    ),
    cell: ({ row }) => {
      let article = row.getValue("article") as Article["article"];
      return (
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center w-16">
            {article?.coverImage ? (
              <img
                src={article.coverImage}
                className="w-full h-full object-cover rounded-[4px] aspect-video"
              />
            ) : (
              <div className="flex border items-center justify-center w-full h-full rounded-[4px] aspect-video bg-muted">
                <QuestionMarkIcon className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
          <Link
            href={`/editor/${article.id}`}
            className="text-base font-medium hover:text-primary transition-colors truncate max-w-[300px]"
          >
            {article.title}
          </Link>
        </div>
      );
    },
    enableSorting: true,
    sortingFn: (rowA, rowB, id) => {
      let a = rowA.getValue(id) as Article["article"];
      let b = rowB.getValue(id) as Article["article"];
      return a.title.localeCompare(b.title);
    },
    filterFn: (row, id, value) => {
      let article = row.getValue("article") as Article["article"];
      let author = row.getValue("author") as Article["author"];
      return (
        article.title.toLowerCase().includes(value.toLowerCase()) ||
        (author.first_name + " " + author.last_name)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        author.username.toLowerCase().includes(value.toLowerCase()) ||
        author.email.toLowerCase().includes(value.toLowerCase())
      );
    },
  },
  {
    accessorKey: "author",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Submitted By" />
    ),
    cell: ({ row }) => {
      let author = row.getValue("author") as Article["author"];

      return (
        <div className="flex items-center gap-2 min-w-fit">
          <Avatar className="w-9 h-9">
            <AvatarImage
              className="object-cover border rounded-full"
              src={author.avatar}
            />
            <AvatarFallback className="object-cover border rounded-full">
              {author?.first_name?.charAt(0) + author?.last_name?.charAt(0)}
            </AvatarFallback>
            <span className="sr-only">
              {author?.first_name} {author?.last_name}
            </span>
          </Avatar>
          <div className="flex flex-col gap-0">
            <div className="inline-flex gap-2">
              <span className="text-sm font-medium whitespace-nowrap">
                {String(author?.first_name + " " + author?.last_name).slice(
                  0,
                  20,
                )}
              </span>
              <Badge variant="outline" className="h-[1.1rem] text-xs">
                {author?.role === "admin" ? "Admin" : "Member"}
              </Badge>
            </div>

            <span className="text-xs text-muted-foreground">
              {author?.email}
            </span>
          </div>
        </div>
      );
    },
    enableSorting: false,
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
  // {
  //   accessorKey: "category",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       className="w-full"
  //       title="Category"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     let category = row.getValue("category") as Article["category"];
  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {category ? (
  //           <Badge variant={"outline"} className="text-xs">
  //             {category.name}
  //           </Badge>
  //         ) : (
  //           <Badge variant={"warning"} className="text-xs">
  //             Uncategorized
  //           </Badge>
  //         )}
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },

  // {
  //   accessorKey: "publishedAt",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       className="w-[140px]"
  //       column={column}
  //       title="Published Date"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex w-[120px] p-0 items-center">
  //         <span className="text-sm font-medium">
  //           {row.getValue("publishedAt")
  //             ? format(new Date(row.getValue("publishedAt")), "MMM dd, yyyy")
  //             : "N/A"}
  //         </span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
