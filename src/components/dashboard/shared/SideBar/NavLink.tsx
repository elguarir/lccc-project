"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"a">;

function NavLink({ href, children, className, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const queryparams = useSearchParams().toString();
  let path = pathname;
  if (queryparams) {
    path = `${pathname}?${queryparams}`;
  }

  const active = path === href;
  
  
  return (
    <li className="relative" key={href}>
      <Link
        {...props}
        className={cn(
          "flex items-center max-md:rounded justify-between outline-none h-fit w-full px-8 pr-3 py-2 text-base font-medium transition-colors duration-300 hover:text-foreground hover:bg-muted text-muted-foreground",
          className,
          active && "bg-muted text-foreground",
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}

export default NavLink;
