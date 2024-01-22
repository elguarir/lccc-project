"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import format from "date-fns/format";
import { DataTableColumnHeader } from "@/components/dashboard/shared/Tables/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { User } from "../data/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const columns: ColumnDef<User>[] = [
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
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => {
      let user = row.getValue("user") as {
        firstName: string;
        lastName: string;
        email: string;
        avatar: string;
      };
      return (
        <div className="flex items-center gap-2 min-w-fit">
          <Avatar className="w-9 h-9">
            <AvatarImage
              className="object-cover border rounded-full"
              src={user.avatar}
            />
            <AvatarFallback className="object-cover border rounded-full">
              {user?.firstName?.charAt(0) + user?.lastName?.charAt(0)}
            </AvatarFallback>
            <span className="sr-only">
              {user?.firstName} {user?.lastName}
            </span>
          </Avatar>
          <div className="flex flex-col gap-0">
            <span className="text-sm font-medium whitespace-nowrap">
              {String(user?.firstName + " " + user?.lastName).slice(0, 20)}
            </span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
        </div>
      );
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      let user = row.getValue("user") as {
        firstName: string;
        lastName: string;
        email: string;
        avatar: string;
      };
      let fullName = `${user?.firstName} ${user?.lastName}`;
      let username = row.getValue("username") as string;
      return (
        fullName.toLowerCase().includes(String(value).toLowerCase()) ||
        username.toLowerCase().includes(String(value).toLowerCase()) ||
        user.email.toLowerCase().includes(String(value).toLowerCase())
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => {
      return <div className="flex space-x-2 ">{row.getValue("username")}</div>;
    },
    filterFn: (row, value) => {
      console.log(value);
      let username = row.getValue("username") as string;
      return username.includes(value);
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="w-full" title="Role" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <Badge
            variant={row.getValue("role") === "admin" ? "default" : "secondary"}
          >
            {row.getValue("role") === "admin" ? "Admin" : "Member"}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-[140px]"
        column={column}
        title="Joined"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[120px] p-0 items-center">
          <span className="text-sm font-medium text-center">
            {format(new Date(row.getValue("createdAt")), "MMM dd, yyyy")}
          </span>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
