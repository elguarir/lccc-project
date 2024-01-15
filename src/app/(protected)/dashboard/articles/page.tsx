import AddNew from "@/components/dashboard/articles/AddNew";
import React from "react";

const ArticlesPage = () => {
  return (
    <main className="flex flex-col items-center w-full py-3 md:py-5">
      <header className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-semibold xl:text-3xl">Articles</h1>
        <AddNew />
      </header>
    </main>
  );
};

export default ArticlesPage;
