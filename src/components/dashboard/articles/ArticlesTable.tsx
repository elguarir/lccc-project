"use client";
import { UserArticlesType } from "@/types/article";
import React, { useCallback, useEffect } from "react";
import ArticleCard from "./ArticlesCard";
import { trpc } from "@/server/client";
import { Skeleton } from "../../ui/skeleton";
import { useSearchParams } from "next/navigation";

type Props = {
  articles?: UserArticlesType;
};

const ArticlesTable = ({}: Props) => {
  const { data: articles, isLoading } = trpc.article.userArticles.useQuery();
  const params = useSearchParams();
  const type = params.get("type");

  const filteredarticles = articles?.filter((article) => {
    if (type === "draft" || type === "published") {
      return article.status === type.toUpperCase();
    } else {
      return true;
    }
  });

  if (isLoading) {
    return (
      <ul className="table w-full p-2 space-y-1 border-2 border-dashed rounded-lg border-muted-foreground/20">
        {[0, 1, 2, 4, 5, 6].map((_, idx) => (
          <Skeleton key={idx} className="w-full h-16" />
        ))}
      </ul>
    );
  }

  if (
    !articles ||
    articles.length === 0 ||
    !filteredarticles ||
    filteredarticles.length === 0
  ) {
    return (
      <div className="flex items-center justify-center w-full p-4 border border-dashed rounded-lg h-52">
        <div className="text-lg text-muted-foreground">
          You have not created any {type !== undefined ? type : ""} articles
          yet.
        </div>
      </div>
    );
  }
  return (
    <ul className="table w-full overflow-hidden border border-dashed divide-y rounded-lg divide-dashed">
      {filteredarticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </ul>
  );
};

export default ArticlesTable;
