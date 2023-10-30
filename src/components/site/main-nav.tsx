import * as React from "react";
import Link from "next/link";

import { NavItem } from "@/types/nav";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import MobileNav from "./mobile-nav";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex items-center justify-between flex-1 gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <img src="/images/somacep.png" alt="" className="h-14" />
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-base font-[550] hover:text-primary-background transition-colors  text-dark-foreground",
                    item.disabled && "cursor-not-allowed opacity-80",
                  )}
                >
                  {item.title}
                </Link>
              ),
          )}
        </nav>
      ) : null}
      <MobileNav items={items} />
      <Button
        className="hidden text-base font-medium md:flex"
        size={"default"}
        variant={"default"}
        asChild
      >
        <Link href={"/contact"}>
          <Mail className="w-4 h-4 mr-2" strokeWidth={2.5} />
          Contact Us
        </Link>
      </Button>
    </div>
  );
}
