"use client";
import React from "react";
import { DataTable } from "./components/data-table";
import { adminColumns, columns } from "./components/columns";
import { trpc } from "@/server/client";
import { TUserArticles } from "@/server/routers/article";
import { Article as ArticleType } from "@/components/dashboard/articles/user/data/schema";

const ArticlesTable = ({
  initialData,
  userId,
  isAdmin,
}: {
  userId: string;
  initialData: TUserArticles;
  isAdmin: boolean;
}) => {
  let { data: articles } = trpc.article.getUserArticles.useQuery(
    {
      userId: userId,
    },
    {
      initialData: initialData,
    },
  );

  return (
    <div className="flex flex-col w-full mt-8 md:p-3">
      <DataTable
        data={formatArticles(articles)}
        columns={isAdmin ? adminColumns : columns}
      />
    </div>
  );
};

export default ArticlesTable;

let formatArticles = (articles: TUserArticles) => {
  return articles.map((article) => {
    return {
      id: article.id,
      coverImage: article.main_image,
      title: article.title,
      status: article.status,
      approved: article.approved,
      publishedAt: article.publishedAt?.toISOString(),
    } as ArticleType;
  });
};
