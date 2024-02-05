"use client";
import { trpc } from "@/server/client";
import React from "react";

type Props = {
  initialCount: number;
};

const SubmitttedArticlesCount = (props: Props) => {
  let { data: count } = trpc.article.getSumbittedArticlesCount.useQuery(
    undefined,
    {
      initialData: props.initialCount,
    },
  );
  return <span>{count}</span>;
};

export default SubmitttedArticlesCount;
