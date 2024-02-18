"use client";
import { AreaChart, Card, List, ListItem } from "@tremor/react";

interface SignUpStatsProps {
  data: {
    date: string;
    "Sign Ups": number;
  }[];
  summary: {
    name: string;
    value: number;
  };
}
const SignUpStats = ({ data, summary }: SignUpStatsProps) => {
  const valueFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <>
      <Card>
        <h3 className="text-xl font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Total Members
        </h3>
        <AreaChart
          data={data}
          index="date"
          categories={["Sign Ups"]}
          colors={["blue"]}
          valueFormatter={valueFormatter}
          showLegend={false}
          showYAxis={false}
          showGradient={false}
          startEndOnly={true}
          className="h-32 mt-6 md:h-64"
        />
        <List className="mt-2">
          <ListItem key={summary.name}>
            <div className="flex items-center space-x-2">
              <span className="h-0.5 w-3 bg-blue-500" aria-hidden={true} />
              <span>{summary.name}</span>
            </div>
            <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {valueFormatter(summary.value)}
            </span>
          </ListItem>
        </List>
      </Card>
    </>
  );
};

export default SignUpStats;
