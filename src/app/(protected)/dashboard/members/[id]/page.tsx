import { redirect } from "next/navigation";
import React from "react";

interface MemberPageProps {
  params: {
    id: string;
  };
}

const MemberPage = ({ params }: MemberPageProps) => {
  return redirect("/dashboard/members");
};

export default MemberPage;
