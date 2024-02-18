"use client";
import { Card, CategoryBar, Legend } from "@tremor/react";

type Props = {
  total: number;
  active: number;
  inactive: number;
};

const TotalUsers = ({ active, inactive, total }: Props) => {
  return (
    <Card>
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Total Users
      </p>
      <p className="font-semibold text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {total}
      </p>
      <CategoryBar
        className="mt-4"
        values={[active, inactive]}
        colors={["emerald", "red"]}
      />
      <Legend
        className="mt-3"
        categories={["Active users", "Inactive users"]}
        colors={["emerald", "red"]}
      />
    </Card>
  );
};

export default TotalUsers;
