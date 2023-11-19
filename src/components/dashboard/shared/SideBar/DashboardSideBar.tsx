import { Icons } from "@/assets/icons";
import Link from "next/link";
import React from "react";
import { mainLinks, managementLinks } from "@/lib/constants/DashboardNavLinks";
import NavItems from "./NavItems";
import { SideSheet } from "./SideSheet";
import { siteConfig } from "@/config/site";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreditCard, Keyboard, Settings, User } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import SignOutButton from "../User/SignOutButton";

async function DashboardSideBar() {

  return (
    <>
      <div className="container w-full py-4 max-md:px-6 md:hidden">
        <div className="flex items-center justify-between w-full">
          <SideSheet />
          {/* <UserButton user={session?.user} /> */}
        </div>
      </div>
      <aside className="relative md:flex hidden translate-x-0 overflow-hidden transition-[flex-basis] flex-col w-64 h-full min-w-0 border-r flex-[0_0_320px]">
        <header className="relative w-full p-6">
          <Link
            className="flex items-center justify-center w-full gap-3 "
            href={"/"}
          >
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
          <div className="">
            {/* <UserButton user={session?.user} /> */}
          </div>
        </section>
      </aside>
    </>
  );
}

export default DashboardSideBar;


// function UserButton({ user }: UserButtonProps) {
//   const initials = extractInitialsFromName(user?.name);

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <div className="flex items-center w-full gap-5 p-3 transition-colors duration-200 border-t cursor-pointer hover:bg-secondary">
//           <Avatar>
//             <AvatarImage src={user?.image ?? ""} />
//             <AvatarFallback>{initials}</AvatarFallback>
//           </Avatar>

//           <div className="grid -space-y-1 font-semibold">
//             <span className="text-xs text-muted-foreground">Signed in as</span>
//             <span className="font-semibold tracking-tight">
//               {user?.name ?? "Stranger"}
//             </span>
//           </div>
//         </div>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         align="end"
//         className="w-[300px] mb-2 mx-2 px-3 py-2 mt-1 rounded-xl"
//       >
//         <DropdownMenuLabel className="text-lg">
//           Hello, <br />
//           <span className="font-semibold text-primary/80">
//             {user?.name ?? "Stranger"}
//           </span>
//           !
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuGroup>
//           <DropdownMenuItem className="px-3 py-2">
//             <User className="w-4 h-4 mr-2" />
//             <span>Profile</span>
//           </DropdownMenuItem>
//           <DropdownMenuItem className="px-3 py-2">
//             <CreditCard className="w-4 h-4 mr-2" />
//             <span>Billing</span>
//           </DropdownMenuItem>
//           <DropdownMenuItem className="px-3 py-2">
//             <Settings className="w-4 h-4 mr-2" />
//             <span>Settings</span>
//           </DropdownMenuItem>
//           <DropdownMenuItem className="px-3 py-2">
//             <Keyboard className="w-4 h-4 mr-2" />
//             <span>Keyboard shortcuts</span>
//           </DropdownMenuItem>
//           <ThemeSelector />
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />
//         <SignOutButton />
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

function extractInitialsFromName(name: string | null | undefined): string {
  if (!name) return "";
  const words = name.trim().split(/\s+/);
  const initials: string[] = [];

  for (const word of words) {
    if (word && /^[A-Za-z]+$/.test(word)) {
      initials.push(word[0].toUpperCase());
    }
  }
  return initials.slice(0, 2).join("");
}
