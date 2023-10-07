import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/plate/button";
import { ChevronLeftIcon } from "lucide-react";
interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex items-center justify-center flex-1 w-full h-full px-6">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <>
          <ChevronLeftIcon className="w-4 h-4 mr-2" />
          Back
        </>
      </Link>
      {children}
    </div>
  );
}
