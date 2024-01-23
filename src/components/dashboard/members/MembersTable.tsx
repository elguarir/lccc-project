"use client";
import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { User } from "./data/schema";
import { trpc } from "@/server/client";

const ArticlesTable = () => {
  let { data: users, isLoading } = trpc.user.getUsersList.useQuery();

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col w-full mt-8 md:p-3">
      <DataTable data={users as any} columns={columns} />
    </div>
  );
};

export default ArticlesTable;
