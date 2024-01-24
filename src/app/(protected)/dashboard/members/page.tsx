import AddNewUser from "@/components/dashboard/members/AddNew";
import MembersTable from "@/components/dashboard/members/MembersTable";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getUsersList } from "@/server/routers/user";
import { redirect } from "next/navigation";

async function MembersPage() {
  let user = await useCurrentUser();
  let formattedUsers = await getUsersList();
  
  if (!user) {
    redirect("/sign-in");
  }
  if (user.role !== "admin") {
    redirect("/dashboard");
  }
  

  return (
    <main className="flex flex-col items-center w-full py-3 md:py-5">
      <header className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-[550] md:font-semibold text-foreground ">
          Members
        </h1>
        <AddNewUser />
      </header>
      <MembersTable initialData={formattedUsers} />
    </main>
  );
}

export default MembersPage;
