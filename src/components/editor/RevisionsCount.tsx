"use client";
import { trpc } from "@/server/client";
import React from "react";

type Props = {
  articleId: string;
};

const RevisionsCount = ({ articleId }: Props) => {
  let { data: revisions } = trpc.article.getArticleRevisions.useQuery({
    id: articleId,
  });
  if (!revisions || revisions.length === 0) return null;
  return (
    <div className="absolute w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1.5 -right-1.5">
      {revisions.length} revisions
    </div>
  );
};
export default RevisionsCount;
