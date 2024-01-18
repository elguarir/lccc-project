import Footer from "@/components/site/Footer";
import NavBar from "@/components/site/NavBar";
import ProgressBarProvider from "@/providers/ProgressBarProvider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function PublicLayout({ children }: Props) {
  return (
    <ProgressBarProvider>
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <div className="container py-2.5 max-md:px-6 flex flex-1  w-full min-h-[calc(100vh-69px)] ">
          {children}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </ProgressBarProvider>
  );
}

export default PublicLayout;
