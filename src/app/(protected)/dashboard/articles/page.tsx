import AddNew from "@/components/dashboard/articles/AddNew";
import { DataTable } from "@/components/dashboard/articles/components/data-table";
import { taskSchema } from "@/components/dashboard/articles/data/schema";
import { promises as fs } from "fs";
import path from "path";
import React from "react";
import { columns } from "@/components/dashboard/articles/components/columns";
import { z } from "zod";
const ArticlesPage = async () => {
  const tasks = await getTasks();
  return (
    <main className="flex flex-col items-center w-full py-3 md:py-5">
      <header className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-semibold xl:text-3xl">Articles</h1>
        <AddNew />
      </header>

      <div className="flex flex-col w-full p-3 mt-8 ">
        <DataTable data={tasks} columns={columns} />
      </div>
    </main>
  );
};

export default ArticlesPage;

async function getTasks() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      "src/components/dashboard/articles/data/tasks.json",
    ),
  );
  const tasks = JSON.parse(data.toString());
  return z.array(taskSchema).parse(tasks);
}
