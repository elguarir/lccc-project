"use client";
import React from "react";
import { trpc } from "@/server/client";
import { TSubmittedArticles, TUsersArticles } from "@/server/routers/article";
import { Article } from "./data/schema";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

const MemberArticlesTable = ({
  initialData,
}: {
  initialData: TUsersArticles;
}) => {
  let { data: articles } = trpc.article.getUsersArticles.useQuery(undefined, {
    initialData: initialData,
  });
  
  return (
    <div className="flex flex-col w-full mt-8 md:p-3">
      <DataTable data={formatArticles(articles)} columns={columns} />
    </div>
  );
};

export default MemberArticlesTable;

let formatArticles = (articles: TUsersArticles) => {
  return articles.map((article) => {
    return {
      article: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        coverImage: article.main_image,
      },
      author: {
        id: article.author.id,
        username: article.author.username,
        first_name: article.author.first_name,
        last_name: article.author.last_name,
        email: article.author.email,
        avatar: article.author.avatar_url,
      },
      category: article.category
        ? { id: article.category.id, name: article.category.name }
        : undefined,
      publishedAt: article.publishedAt?.toISOString(),
      approved: article.approved,
      status: article.status as "draft" | "submitted" | "revisions_requested" | "published",
    } as Article;
  });
};

