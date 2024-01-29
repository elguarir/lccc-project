import { redirect } from "next/navigation";
import React from "react";

interface MemberPageProps {
  params: {
    id: string;
  };
}

const MemberPage = ({ params }: MemberPageProps) => {
  return redirect("/dashboard/categories");
};

export default MemberPage;
