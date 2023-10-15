import * as React from "react";
import Link from "next/link";

import { NavItem } from "@/types/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/assets/icons";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex items-center justify-between flex-1 gap-6 px-4 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <img src="/images/somacep.png" alt="" className="h-14" />
      </Link>
      {/* {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-base font-medium hover:text-neutral-400 transition-colors  text-white",
                    item.disabled && "cursor-not-allowed opacity-80",
                  )}
                >
                  {item.title}
                </Link>
              ),
          )}
        </nav>
      ) : null} */}
      <Button size={"sm"} variant={"secondary"}>
        <Mail className="w-4 h-4 mr-2" />
        Contact Us
      </Button>
    </div>
  );
}
