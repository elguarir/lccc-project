import NavBar from "@/components/site/NavBar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function PublicLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <div className="flex justify-center flex-1  w-full h-[calc(100vh-69px)] ">
        {children}
      </div>
    </div>
  );
}

export default PublicLayout;
