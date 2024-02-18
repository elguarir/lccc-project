"use client";
import { Card, CategoryBar, Legend } from "@tremor/react";

type Props = {
  total: number;
  published: number;
  drafts: number;
};

const TotalArticles = ({ published, drafts, total }: Props) => {
  return (
    <Card className="w-full">
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Total Articles
      </p>
      <p className="font-semibold text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {total}
      </p>
      <CategoryBar
        className="mt-4"
        values={[published, drafts]}
        colors={["emerald", "neutral"]}
      />
      <Legend
        className="mt-3"
        categories={["Published", "Drafts"]}
        colors={["emerald", "neutral"]}
      />
    </Card>
  );
};

export default TotalArticles;
