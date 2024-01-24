"use client";
import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { User } from "./data/schema";
import { trpc } from "@/server/client";

const ArticlesTable = ({ initialData }: { initialData: User[] }) => {
  let { data: users } = trpc.user.getUsersList.useQuery(undefined, {
    initialData,
  });
  
  return (
    <div className="flex flex-col w-full mt-8 md:p-3">
      <DataTable data={users as any} columns={columns} />
    </div>
  );
};

export default ArticlesTable;
