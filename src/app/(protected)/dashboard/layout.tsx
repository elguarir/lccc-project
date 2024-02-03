import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import React from "react";

type Props = {
  children: React.ReactNode;
};

async function layout({ children }: Props) {
  return (
      <DashboardLayout>{children}</DashboardLayout>
  );
}

export default layout;
