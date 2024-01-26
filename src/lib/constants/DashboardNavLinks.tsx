import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { DashboardLinkProps } from "@/types/nav";

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
    items: [{ name: "Submitted", href: "/dashboard/articles?type=submitted" }],
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
