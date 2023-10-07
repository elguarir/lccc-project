import { CreditCard, Keyboard, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Role } from "@prisma/client";
import SignOutButton from "./SignOutButton";
import ThemeSelector from "../SideBar/ThemeSelector";
import { Session } from "next-auth";

interface UserButtonProps {
  user: Session["user"] | undefined;
}
export function UserButton({ user }: UserButtonProps) {
  const initials = extractInitialsFromName(user?.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.image ?? ""} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="mt-1 py-2 md:hidden w-[250px] rounded-xl px-3"
      >
        <DropdownMenuLabel className="text-lg">
          Hello, <br />
          <span className="font-semibold text-primary/80">
            {user?.name ?? "Stranger"}
          </span>
          !
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="px-3 py-2">
            <User className="w-4 h-4 mr-2" />
            <span>Profile</span>
            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem className="px-3 py-2">
            <CreditCard className="w-4 h-4 mr-2" />
            <span>Billing</span>
            {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem className="px-3 py-2">
            <Settings className="w-4 h-4 mr-2" />
            <span>Settings</span>
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem className="px-3 py-2">
            <Keyboard className="w-4 h-4 mr-2" />
            <span>Keyboard shortcuts</span>
            {/* <DropdownMenuShortcut>⌘K</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <ThemeSelector />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function extractInitialsFromName(name: string | null | undefined): string {
  // Split the name into words
  if (!name) return "";
  const words = name.trim().split(/\s+/);

  // Initialize an array to store the initials
  const initials: string[] = [];

  // Iterate through the words to extract initials
  for (const word of words) {
    // Check if the word is not empty and consists of letters
    if (word && /^[A-Za-z]+$/.test(word)) {
      // Add the uppercase initial of the word to the initials array
      initials.push(word[0].toUpperCase());
    }
  }

  // Return the first two initials as a string
  return initials.slice(0, 2).join("");
}
