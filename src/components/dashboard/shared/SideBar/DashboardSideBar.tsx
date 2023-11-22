import Link from "next/link";
import React from "react";
import { mainLinks, managementLinks } from "@/lib/constants/DashboardNavLinks";
import NavItems from "./NavItems";
import { SideSheet } from "./SideSheet";


async function DashboardSideBar() {
  return (
    <>
      <div className="container w-full py-4 max-md:px-6 md:hidden">
        <div className="flex items-center justify-between w-full">
          <SideSheet />
        </div>
      </div>
      <aside className="relative md:flex hidden translate-x-0 overflow-hidden transition-[flex-basis] flex-col w-64 h-full min-w-0 border-r flex-[0_0_320px]">
        <header className="relative w-full h-24 p-8 mb-8">
          <Link
            className="flex items-center justify-center w-full gap-3 "
            href={"/"}
          >
            <img className="object-cover w-48 pb-4" src="/images/logo.png" alt="LCCC Logo" />
          </Link>
        </header>
        <section className="flex flex-col justify-between flex-1 w-full overflow-y-auto">
          <div className="flex flex-col w-full gap-6">
            <NavItems links={mainLinks} />
            <NavItems links={managementLinks} />
          </div>
          <div className="">{/* <UserButton user={session?.user} /> */}</div>
        </section>
      </aside>
    </>
  );
}

export default DashboardSideBar;