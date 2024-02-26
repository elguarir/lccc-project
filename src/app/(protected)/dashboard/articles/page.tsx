import AddNew from "@/components/dashboard/articles/AddNew";
import React from "react";
import {
  getUserArticles,
  getUsersArticles,
} from "@/server/routers/article";
import { redirect } from "next/navigation";
import ArticlesTable from "@/components/dashboard/articles/user/ArticlesTable";
import { useCurrentUser } from "@/hooks/use-current-user";
import MemberArticlesTable from "@/components/dashboard/articles/admin/MemberArticlesTable";

export const metadata = {
  title: "Articles",
  description: "A page for displaying user articles",
};

type ArticlesPageProps = {
  searchParams: {
    type: "yours" | "members";
  };
};

const ArticlesPage = async ({ searchParams }: ArticlesPageProps) => {
  let user = await useCurrentUser();
  if (!user) return redirect("/sign-in");

  if (searchParams.type === "members" && user.role === "admin") {
    let memberArticles = await getUsersArticles();
    return (
      <main className="flex flex-col items-center w-full py-3 md:py-5">
        <header className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-[550] md:font-semibold text-foreground ">
            Member Articles
          </h1>
        </header>
        <MemberArticlesTable initialData={memberArticles} />
      </main>
    );
  }

  let ownerArticles = await getUserArticles({
    userId: user.id,
  });
  return (
    <main className="flex flex-col items-center w-full py-3 md:py-5">
      <header className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-[550] md:font-semibold text-foreground ">
          Articles
        </h1>
        <AddNew />
      </header>

      <ArticlesTable userId={user.id} isAdmin={user.role==="admin"} initialData={ownerArticles} />
    </main>
  );
};

export default ArticlesPage;
