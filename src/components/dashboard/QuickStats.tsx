"use client";
import { cn } from "@/lib/utils";
import { Card } from "@tremor/react";


type QuickStatsProps = {
  stats: {
    name: string;
    stat: number;
    change: string;
    changeType: string;
    changeDescription: string;
  }[];
};

export default function QuickStats({stats}:QuickStatsProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <Card key={item.name}>
            <p className="font-medium text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              {item.name}
            </p>
            <div className="mt-2 flex items-baseline justify-between space-x-2.5">
              <div className="inline-flex gap-2">
                <p className="font-semibold text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {item.stat}
                </p>
                <span
                  className={cn(
                    "text-tremor-default font-medium mt-auto",
                    item.changeType === "positive"
                      ? "text-emerald-700 dark:text-emerald-500"
                      : "text-red-700 dark:text-red-500",
                  )}
                >
                  {item.change}
                </span>
              </div>
              <span className="text-xs font-medium text-tremor-content dark:text-dark-tremor-content">
                {item.changeDescription}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
