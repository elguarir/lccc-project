"use client";
import { cn } from "@/lib/utils";
import { Card } from "@tremor/react";

const data = [
  {
    name: "Total Members",
    stat: "56",
    change: "+22.5%",
    changeType: "positive",
    chnageDescription: "Since last month",
  },
  {
    name: "Total Articles",
    stat: "23",
    change: "+2.8%",
    changeType: "positive",
    chnageDescription: "Since last month",
  },
  {
    name: "Total Views",
    stat: "160",
    change: "+19.7%",
    changeType: "positive",
    chnageDescription: "Since last week",
  },
];

export default function QuickStats() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
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
                {item.chnageDescription}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
