import Link from "next/link";
import React from "react";
import { mainLinks } from "@/lib/constants/DashboardNavLinks";
import NavItems from "./NavItems";
import { SideSheet } from "./SideSheet";
import { UserButton, currentUser } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DashboardLinkProps } from "@/types/nav";
import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSubmittedArticles, getSubmittedArticlesCount } from "@/server/routers/article";
import SubmitttedArticlesCount from "./SubmitttedArticlesCount";

async function DashboardSideBar() {
  let user = await useCurrentUser();
  let submittedArticlesCount = await getSubmittedArticlesCount();
  
  let adminLinks: DashboardLinkProps[] = [
    {
      name: "Articles",
      href: "/dashboard/articles",
      type: "accordion",
      icon: Icons.articleIcon,
      endContent: () => (
        <Button variant={"ghost"} size={"xs"}>
          <Icons.add className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
        </Button>
      ),
      items: [
        {
          name: "Submitted",
          href: "/dashboard/articles?type=submitted",
          endContent: () => (
            <Badge variant={"default"} className="px-1.5">
              <SubmitttedArticlesCount initialCount={submittedArticlesCount} />
            </Badge>
          ),
        },
      ],
    },
    {
      name: "Categories",
      href: "/dashboard/categories",
      type: "link",
      icon: Icons.categoriesIcon,
    },
    {
      name: "Events",
      href: "/dashboard/events",
      type: "link",
      icon: Icons.calanderIcon,
    },
    {
      name: "Members",
      href: "/dashboard/members",
      type: "link",
      icon: Icons.usersIcon,
    },
  ];

  let regularLinks: DashboardLinkProps[] = [
    {
      name: "Articles",
      href: "/dashboard/articles",
      type: "link",
      icon: Icons.articleIcon,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      type: "link",
      // @ts-ignore
      icon: Icons.settings,
    },
  ];

  return (
    <>
      <div className="container w-full py-4 max-md:pl-4 max-md:pr-5 md:hidden">
        <div className="flex items-center justify-between w-full">
          <SideSheet />
          <UserButton />
        </div>
      </div>
      <aside className="relative md:flex hidden translate-x-0 overflow-hidden transition-[flex-basis] flex-col w-64 h-full min-w-0 border-r flex-[0_0_320px]">
        <header className="relative w-full p-8 mb-6">
          <Link
            className="flex items-center justify-center w-full gap-3 "
            href={"/"}
          >
            <img
              className="object-cover w-48"
              src="/images/logo.png"
              alt="LCCC Logo"
            />
          </Link>
        </header>
        <section className="flex flex-col justify-between flex-1 w-full overflow-y-auto">
          <div className="flex flex-col w-full gap-6">
            <NavItems links={mainLinks} />
            <NavItems
              links={user?.role === "admin" ? adminLinks : regularLinks}
            />
          </div>
          <div className="flex items-center gap-3 px-6 py-4">
            <div className="w-8">
              <UserButton />
            </div>
            <div className="flex items-center w-full">
              <div className="flex flex-1 w-full flex-col -space-y-0.5">
                <span className="text-sm font-[550] tracking-tight">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-sm text-muted-foreground font-[550] tracking-tight">
                  @{user?.username}
                </span>
              </div>
              <div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </section>
      </aside>
    </>
  );
}

export default DashboardSideBar;
