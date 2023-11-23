import { Await } from "@/components/shared/Await";
import { currentUser } from "@clerk/nextjs";

function DashboardPage() {
  const user = currentUser();
  return (
    <div className="flex flex-col flex-1 w-full py-6">
      <Await promise={user}>
        {(user) => (
          <h1 className="mb-8 text-2xl font-bold md:text-3xl text-foreground">
            Howdy, <span className="text-primary-600">{user?.firstName} 👋</span>
          </h1>
        )}
      </Await>
      {/* <h1 className="text-3xl mb-8 font-[550] md:font-bold font-display text-foreground">
        Dashboard
      </h1> */}
      <div className="grid gap-4 xl:grid-cols-2"></div>
    </div>
  );
}

export default DashboardPage;
