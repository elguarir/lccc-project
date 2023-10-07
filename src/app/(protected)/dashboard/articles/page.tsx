import ArticlesTable from "@/components/articles/ArticlesTable";
import Header from "@/components/dashboard/articles/Header";
import useAuthSession from "@/hooks/useAuthSession";
import { GetUserArticles } from "@/lib/helpers/GetUserArticles";
import React from "react";

async function ArticlesPage() {
  // const userId = await useAuthSession().then((res) => res?.user?.userId);
  // const articles = await GetUserArticles(userId);

  return (
    <div>
      <Header />
      <div className="w-full pt-4">
        <ArticlesTable />
      </div>
    </div>
  );
}

export default ArticlesPage;
