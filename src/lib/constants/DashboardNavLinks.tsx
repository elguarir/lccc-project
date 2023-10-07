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
  // {
  //   name: "View Site",
  //   href: "/",
  //   type: "link",
  //   icon: Icons.HomeIcon,
  //   endContent: () => (
  //     <Button
  //       className={buttonVariants({
  //         variant: "outline",
  //         size: "xs",
  //       })}
  //     >
  //       <Icons.externalArrow className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
  //     </Button>
  //   ),
  // },
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
      { name: "Drafts", href: "/dashboard/articles?type=drafts" },
    ],
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
    type: "link",
    icon: Icons.categoriesIcon,
  },
  {
    name: "Tags",
    href: "/dashboard/tags",
    type: "link",
    icon: Icons.tagsIconRounded,
  },
  {
    name: "Members",
    href: "/dashboard/members",
    type: "link",
    icon: Icons.usersIcon,
  }
];
