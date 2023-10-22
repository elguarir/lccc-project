import React from "react";
import NewServiceButton from "./NewServiceButton";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="sticky top-0 z-10 w-full py-6 border-b border-transparent">
      <header className="relative flex items-center justify-between w-full">
        <h2 className="text-3xl font-[550] md:font-bold font-display text-foreground">
          Services
        </h2>
        <NewServiceButton />
      </header>
    </div>
  );
}
