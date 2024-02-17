"use client";
import { trpc } from "@/server/client";
import { TgetArticleRevisions } from "@/server/routers/article";
import React from "react";
import Revision from "./Revision";

type Props = {
  initialData: TgetArticleRevisions;
  articleId: string;
};

const Revisions = ({ initialData, articleId }: Props) => {
  let { data: revisions } = trpc.article.getArticleRevisions.useQuery(
    { id: articleId },
    {
      initialData,
    },
  );

  return (
    <>
      {revisions.length === 0 && (
        <div className="text-sm font-medium tracking-wide text-muted-foreground">
          No revisions yet.
        </div>
      )}
      {revisions.map((revision) => {
        return <Revision key={revision.id} revision={revision} />;
      })}
    </>
  );
};

export default Revisions;
