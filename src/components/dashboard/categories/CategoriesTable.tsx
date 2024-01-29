"use client";
import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { trpc } from "@/server/client";
import { Category, Event } from "@prisma/client";
import { TCategoryWithArticleCount } from "@/server/routers/category";

const CategoriesTable = ({
  initialData,
}: {
  initialData: TCategoryWithArticleCount;
}) => {
  let { data: categories } = trpc.category.getCategories.useQuery(undefined, {
    initialData,
  });

  return (
    <div className="flex flex-col w-full mt-8 md:p-3">
      <DataTable data={formatCategories(categories)} columns={columns} />
    </div>
  );
};

export default CategoriesTable;

let formatCategories = (categories: TCategoryWithArticleCount) => {
  return categories.map((cat) => {
    return {
      category: {
        id: cat.id,
        title: cat.name,
      },
      slug: cat.slug,
      articleCount: cat.articleCount,
      createdAt: cat.createdAt,
    };
  });
};
