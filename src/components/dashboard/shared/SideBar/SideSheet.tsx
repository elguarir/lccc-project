import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import NavItems from "./NavItems";
import { mainLinks, managementLinks } from "@/lib/constants/DashboardNavLinks";
import { siteConfig } from "@/config/site";

export function SideSheet() {
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
      </SheetContent>
    </Sheet>
  );
}
