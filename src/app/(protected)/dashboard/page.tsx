import QuickDraft from "@/components/dashboard/QuickDraft";
import QuickStats from "@/components/dashboard/QuickStats";
import SignUpStats from "@/components/dashboard/SignUpStats";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import db from "@/prisma";

import { currentUser } from "@clerk/nextjs";
import { eachDayOfInterval, endOfDay, format, startOfDay } from "date-fns";

async function DashboardPage() {
  const user = await currentUser();
  let articlesCount = await getPublishedArticlesCount();
  let signupsByDate = await getUsersCountByDate();
  console.log(signupsByDate);
  const stats = [
    {
      name: "Total Members",
      stat: 50,
      change: "+22.5%",
      changeType: "positive",
      changeDescription: "Since last month",
    },
    {
      name: "Total Articles",
      stat: articlesCount,
      change: "+2.8%",
      changeType: "positive",
      changeDescription: "Since last month",
    },
    {
      name: "Total Views",
      stat: 160,
      change: "+19.7%",
      changeType: "positive",
      changeDescription: "Since last week",
    },
  ];

  return (
    <div className="flex flex-col flex-1 w-full py-6">
      <h1 className="mb-8 text-2xl font-bold md:text-3xl text-foreground">
        Howdy, <span className="text-primary-600">{user?.firstName} 👋</span>
      </h1>
      <div className="grid w-full gap-12 py-6">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2">
          {/* <QuickStats stats={stats} /> */}
          <SignUpStats
            data={signupsByDate}
            summary={{
              name: "Total Members",
              value: signupsByDate.reduce((acc, curr) => acc + curr["Sign Ups"], 0),
            }}
          />
        </div>
        {/* quick draft */}
        <div className="grid gap-4 lg:grid-cols-10 xl:grid-cols-12">
          <Card className="col-span-5">
            <CardHeader>
              <CardTitle className="text-xl font-medium leading-normal tracking-normal">Quick Draft</CardTitle>
              <CardDescription>
                You've got a new idea? Jot it down here, and get back to it
                later.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuickDraft />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

async function getPublishedArticlesCount() {
  let articles = await db.article.count({
    where: {
      status: "published",
      approved: true,
      deletedAt: null,
    },
  });
  return articles;
}

async function getUsersCountByDate() {
  const users = await db.user.findMany({
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const groupedByDate = users.reduce<Record<string, number>>((acc, user) => {
    const date = format(new Date(user.createdAt), "MMM d");
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date]++;
    return acc;
  }, {});

  // Get the first and last date from the data
  const dates = Object.keys(groupedByDate);
  const firstDate = new Date(dates[0]);
  const lastDate = new Date(dates[dates.length - 1]);

  // Generate all dates between the first and last date
  const allDates = eachDayOfInterval({
    start: startOfDay(firstDate),
    end: endOfDay(lastDate),
  }).map((date) => format(date, "MMM d"));

  // Merge the generated dates with the existing data
  const result = allDates.map((date) => ({
    date,
    "Sign Ups": groupedByDate[date] || 0,
  }));

  return result;
}