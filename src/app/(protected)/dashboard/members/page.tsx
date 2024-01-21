import AddNew from "@/components/dashboard/members/AddNew";

async function ArticlesPage() {
  return (
    <main className="flex flex-col items-center w-full py-3 md:py-5">
      <header className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-[550] md:font-semibold text-foreground ">
          Members
        </h1>
        <AddNew />
      </header>
    </main>
  );
}

export default ArticlesPage;
