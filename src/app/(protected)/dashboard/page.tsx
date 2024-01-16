import Editor from "@/components/editor/editor";
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
      {/* <div className="grid gap-4 xl:grid-cols-2"></div> */}
      <div className="mt-4">
      </div>
    </div>
  );
}

export default DashboardPage;
