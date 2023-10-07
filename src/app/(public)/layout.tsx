import { SiteHeader } from "@/components/site/site-header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function PublicLayout({ children }: Props) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}

export default PublicLayout;
