import HeaderSection from "@/components/home/HeaderSection";
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
        <div className="z-50 w-full h-full pt-32 pb-10 lg:container">
          <HeaderSection />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default PublicLayout;
