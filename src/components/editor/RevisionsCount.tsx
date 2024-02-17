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
  return <>{revisions.length}</>;
};

export default RevisionsCount;
