import Footer from "@/components/home/Footer";
import { SiteHeader } from "@/components/site/site-header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function PublicLayout({ children }: Props) {
  return (
    <div className="overflow-x-hidden bg-neutral-50">
      <div className="relative">
        <SiteHeader />
        
      </div>
      <div className="z-50 w-full h-full min-h-screen pt-32 pb-10">{children}</div>
      <Footer />
    </div>
  );
}

export default PublicLayout;
