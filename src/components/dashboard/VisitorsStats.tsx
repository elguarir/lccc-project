"use client";
import { AreaChart, Card, List, ListItem } from "@tremor/react";

const dataFormatter = (number: number) => number.toString();

export function LastMonthVisitors({
  chartdata,
}: {
  chartdata: {
    date: string;
    Visitors: number;
  }[];
}) {
  let totalVisits = chartdata.reduce((acc, { Visitors }) => acc + Visitors, 0);

  return (
    <Card>
      <h3 className="text-xl font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Visitors
      </h3>
      <AreaChart
        className="h-48 mt-6 md:h-64"
        data={chartdata}
        index="date"
        showAnimation
        showGradient
        categories={["Visitors"]}
        colors={["indigo"]}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
      />
      <List className="mt-2">
        <ListItem>
          <div className="flex items-center space-x-2">
            <span className="h-0.5 w-3 bg-blue-500" aria-hidden={true} />
            <span>Total Visits</span>
          </div>
          <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {totalVisits}
          </span>
        </ListItem>
      </List>
    </Card>
  );
}
