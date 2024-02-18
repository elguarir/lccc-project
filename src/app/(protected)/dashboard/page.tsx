import QuickDraft from "@/components/dashboard/QuickDraft";
import QuickStats from "@/components/dashboard/QuickStats";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { currentUser } from "@clerk/nextjs";

async function DashboardPage() {
  const user = await currentUser();
  return (
    <div className="flex flex-col flex-1 w-full py-6">
      <h1 className="mb-8 text-2xl font-bold md:text-3xl text-foreground">
        Howdy, <span className="text-primary-600">{user?.firstName} 👋</span>
      </h1>
      {/* <h1 className="text-3xl mb-8 font-[550] md:font-bold font-display text-foreground">
        Dashboard
      </h1> */}
      <div className="grid w-full gap-12 py-6">
        <div className="w-full">
          <QuickStats />
        </div>
        {/* quick draft */}
        <div className="grid gap-4 xl:grid-cols-12">
          <Card className="col-span-5">
            <CardHeader>
              <CardTitle>
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
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
