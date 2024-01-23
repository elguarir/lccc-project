import AddNewUser from "@/components/dashboard/members/AddNew";
import MembersTable from "@/components/dashboard/members/MembersTable";
import { getUsersList } from "@/server/routers/user";

async function MembersPage() {
  let formattedUsers = await getUsersList();
  return (
    <main className="flex flex-col items-center w-full py-3 md:py-5">
      <header className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-[550] md:font-semibold text-foreground ">
          Members
        </h1>
        <AddNewUser  />
      </header>
      <MembersTable initialData={formattedUsers as any} />
    </main>
  );
} 

export default MembersPage;


