import ArticlesTable from "@/components/dashboard/articles/ArticlesTable";
import Header from "@/components/dashboard/articles/Header";
import React from "react";

async function ArticlesPage() {

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
