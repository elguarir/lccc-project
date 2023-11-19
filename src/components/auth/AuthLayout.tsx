import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "../ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col flex-1 w-full h-screen px-6 py-4">
      <Button asChild size={"sm"} className="w-fit" variant={"ghost"}>
        <Link href="/">
          <ChevronLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Link>
      </Button>
      <div className="flex items-center justify-center flex-1 h-full">
        {children}
      </div>
    </div>
  );
}
