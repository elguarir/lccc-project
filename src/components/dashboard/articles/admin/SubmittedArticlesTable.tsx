"use client";
import React from "react";
import { trpc } from "@/server/client";
import { TSubmittedArticles } from "@/server/routers/article";
import { Article } from "./data/schema";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

const SubmittedArticlesTable = ({
  initialData,
}: {
  initialData: TSubmittedArticles;
}) => {
  let { data: articles } = trpc.article.getSumbittedArticles.useQuery(
    undefined,
    {
      initialData: initialData,
    },
  );
  return (
    <div className="flex flex-col w-full mt-8 md:p-3">
      <DataTable data={formatArticles(articles)} columns={columns} />
    </div>
  );
};

export default SubmittedArticlesTable;

let formatArticles = (articles: TSubmittedArticles) => {
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
    } as Article;
  });
};

/**
 * 
 * const articleSchema = z.object({
  article: z.object({
    id: z.string(),
    title: z.string(),
    coverImage: z.string().nullish(),
  }),
  author: z.object({
    id: z.string(),
    username: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    avatar: z.string(),
  }),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
  publishedAt: z.string(),
});
 */
