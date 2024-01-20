import AddNew from "@/components/dashboard/articles/AddNew";
import React from "react";
import {  getUserArticles } from "@/server/routers/article";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ArticlesTable from "@/components/dashboard/articles/ArticlesTable";

const ArticlesPage = async () => {
  let { userId } = auth();
  if (!userId) return redirect("/sign-in");

  let articles = await getUserArticles({
    userId: userId,
  });

  return (
    <main className="flex flex-col items-center w-full py-3 md:py-5">
      <header className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-semibold xl:text-3xl">Articles</h1>
        <AddNew />
      </header>
      
      <ArticlesTable userId={userId} initialData={articles} />
    </main>
  );
};

export default ArticlesPage;
