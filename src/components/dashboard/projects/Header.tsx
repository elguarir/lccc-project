import React from "react";
import NewProjectButton from "./NewProjectButton";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="sticky top-0 z-10 w-full py-6 border-b border-transparent">
      <header className="relative flex items-center justify-between w-full">
        <h2 className="text-3xl font-[550] md:font-bold font-display text-foreground">
          Projects
        </h2>
        <NewProjectButton />
      </header>
    </div>
  );
}
