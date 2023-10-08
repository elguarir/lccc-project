import { Icons } from "@/assets/icons";
import Link from "next/link";
import React from "react";
import { mainLinks, managementLinks } from "@/lib/constants/DashboardNavLinks";
import NavItems from "./NavItems";
import { SideSheet } from "./SideSheet";
import { UserButton } from "../User/UserButton";
import useAuthSession from "@/hooks/useAuthSession";
import { siteConfig } from "@/config/site";

async function DashboardSideBar() {
  const session = await useAuthSession();

  return (
    <>
      <div className="container w-full py-4 max-md:px-6 md:hidden">
        <div className="flex items-center justify-between w-full">
          <SideSheet />
          <UserButton user={session?.user} />
        </div>
      </div>
      <aside className="relative md:flex hidden translate-x-0 overflow-hidden transition-[flex-basis] flex-col w-64 h-full min-w-0 border-r flex-[0_0_320px]">
        <header className="relative w-full h-24 p-8">
          <Link className="flex items-center w-full gap-3 " href={"/"}>
            <Icons.logo className="w-8 h-8 mt-1 text-foreground" />
            <span className="text-xl text-[1.15rem] font-bold tracking-wide font-display">
              {siteConfig.name}
            </span>
          </Link>
        </header>
        <section className="flex flex-col justify-between flex-1 w-full overflow-y-auto">
          <div className="flex flex-col w-full gap-6">
            <NavItems links={mainLinks} />
            <NavItems links={managementLinks} />
          </div>
          <div></div>
        </section>
      </aside>
    </>
  );
}

export default DashboardSideBar;
