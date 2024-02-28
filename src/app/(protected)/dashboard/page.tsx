import QuickDraft from "@/components/dashboard/QuickDraft";
import SignUpStats from "@/components/dashboard/SignUpStats";
import { LastMonthVisitors } from "@/components/dashboard/VisitorsStats";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import db from "@/prisma";
import {
  getLastMonthVisits,
  getUsersArticles,
} from "@/server/routers/article";

import { currentUser } from "@clerk/nextjs";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { eachDayOfInterval, endOfDay, format, startOfDay } from "date-fns";
import { unstable_noStore } from "next/cache";
import Link from "next/link";

async function DashboardPage() {
  unstable_noStore();
  const user = await currentUser();
  let signupsByDate = await getUsersCountByDate();
  let latestArticles = await getUsersArticles();
  let chartdata = await getLastMonthVisits();
  return (
    <div className="flex flex-col flex-1 w-full max-w-6xl py-6 mx-auto">
      <h1 className="mb-8 text-2xl font-bold md:text-3xl text-foreground">
        Howdy, <span className="text-primary-600">{user?.firstName} 👋</span>
      </h1>
      <div className="grid w-full gap-12 py-6">
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
          {/* <QuickStats stats={stats} /> */}
          <SignUpStats
            data={signupsByDate}
            summary={{
              name: "Total Members",
              value: signupsByDate.reduce(
                (acc, curr) => acc + curr["Sign Ups"],
                0,
              ),
            }}
          />
          <LastMonthVisitors chartdata={chartdata} />
        </div>
        {/* quick draft */}
        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-medium leading-normal tracking-normal">
                Quick Draft
              </CardTitle>
              <CardDescription>
                You've got a new idea? Jot it down here, and get back to it
                later.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuickDraft />
            </CardContent>
          </Card>
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-xl font-medium leading-normal tracking-normal">
                Latest articles
              </CardTitle>
              <CardDescription>
                Here are the latest articles that were published or submitted by
                members.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <div className="grid w-full grid-cols-1 gap-2">
                {latestArticles.length === 0 && (
                  <div className="flex items-center justify-center h-24 text-xl font-medium text-muted-foreground">
                    No articles found.
                  </div>
                )}
                {latestArticles.slice(0, 3).map((article) => (
                  <div
                    key={article.id}
                    className="grid w-full grid-cols-1 gap-1 px-4 py-3 border rounded-lg shadow-sm border-card bg-muted"
                  >
                    <div className="@container flex items-center justify-between gap-2">
                      <div className="line-clamp-1">{article.title}</div>
                      <Badge
                        variant={
                          article.status == "revisions_requested"
                            ? "warning"
                            : article.status == "submitted"
                              ? "success"
                              : article.status == "published"
                                ? "default"
                                : "outline"
                        }
                        className="hidden @md:block"
                      >
                        {
                          {
                            submitted: "Submitted",
                            published: "Published",
                            revisions_requested: "Revisions Requested",
                            draft: "Draft",
                          }[article.status]
                        }
                      </Badge>
                    </div>
                    <div>
                      by{" "}
                      <Link
                        href={`/authors/${article.author.username}`}
                        className="font-semibold"
                      >
                        <span className="hover:underline">
                          {article.author.first_name} {article.author.last_name}
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end pt-4 mt-auto">
                <Button
                  asChild
                  variant={"outline"}
                  size={"sm"}
                  className="px-4"
                >
                  <Link href={"/dashboard/articles?type=members"}>
                    View all
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;


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
