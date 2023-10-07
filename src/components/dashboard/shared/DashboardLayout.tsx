import React from "react";
import DashboardSideBar from "./SideBar/DashboardSideBar";
import MaxWidthWrapper from "./MaxWidthWrapper";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <main className="flex w-full h-screen md:items-center max-md:flex-col">
      <DashboardSideBar />
      <div className="relative flex flex-col flex-1 h-full overflow-x-hidden overflow-y-auto">
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
      </div>
    </main>
  );
}
