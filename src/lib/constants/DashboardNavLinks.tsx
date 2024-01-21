import { Icons } from "@/assets/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { DashboardLinkProps } from "@/types/nav";
import { Link } from "lucide-react";

export const mainLinks: DashboardLinkProps[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    type: "link",
    icon: Icons.dashboardIcon,
  },
];

export const managementLinks: DashboardLinkProps[] = [
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
      { name: "Published", href: "/dashboard/articles?type=published" },
      { name: "Draft", href: "/dashboard/articles?type=draft" },
    ],
  },
  {
    name: "Members",
    href: "/dashboard/members",
    type: "link",
    icon: Icons.usersIcon,
  },
];
