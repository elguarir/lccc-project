import HeaderSection from "@/components/home/HeaderSection";
import { SiteHeader } from "@/components/site/site-header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function PublicLayout({ children }: Props) {
  return (
    <>
      <div
        className="relative bg-[#1b1a1a]  bg-header bg-cover bg-center rounded-bl-[30px] rounded-br-[30px]"
        style={
          {
            // zoom: 1.15
          }
        }
      >
        <SiteHeader />
        <div className="z-50 w-full h-full py-32 lg:container">
          <HeaderSection />
        </div>
      </div>
      <div>{children}</div>
    </>
  );
}

export default PublicLayout;
