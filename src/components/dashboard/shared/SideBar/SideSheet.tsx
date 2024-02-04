import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import NavItems from "./NavItems";
import { mainLinks } from "@/lib/constants/DashboardNavLinks";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DashboardLinkProps } from "@/types/nav";
import { Badge } from "@/components/ui/badge";

export async function SideSheet() {
  let user = await useCurrentUser();
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
              2
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
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="w-12 h-10 p-2"
          aria-label="menu toggle"
        >
          <Icons.menuBar className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="h-full w-fit">
        <aside className="relative flex translate-x-0 overflow-hidden transition-[flex-basis] flex-col w-64 h-full min-w-0 flex-[0_0_320px]">
          <header className="relative w-full h-24 p-8 mb-8">
            <Link className="flex items-center w-full gap-3 " href={"/"}>
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
              <NavItems links={user?.role === "admin" ? adminLinks : regularLinks} />
            </div>
          </section>
        </aside>
      </SheetContent>
    </Sheet>
  );
}
