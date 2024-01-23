import React from "react";

interface MemberPageProps {
  params: {
    id: string;
  };
}

const MemberPage = ({ params }: MemberPageProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Edit Member's Details</h2>
      <p className="text-sm font-medium text-muted-foreground">{params.id}</p>
    </div>
  );
};

export default MemberPage;
