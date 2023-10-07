import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="sticky top-0 z-10 w-full py-6 border-b border-transparent">
      <header className="relative flex items-center justify-between w-full">
        <h2 className="text-3xl font-[550] md:font-bold font-display text-foreground">
          Articles
        </h2>
        <Button
          size={"sm"}
        >
          <PlusIcon strokeWidth={2.5} className="w-4 h-4 mr-2" />
          New Article
        </Button>
      </header>
    </div>
  );
}
