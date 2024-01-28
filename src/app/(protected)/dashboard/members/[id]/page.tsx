import React from "react";

interface MemberPageProps {
  params: {
    id: string;
  };
}

const MemberPage = ({ params }: MemberPageProps) => {
  return (
    <main className="flex flex-col items-center w-full py-3 md:py-5">
      <header className="flex flex-col w-full gap-1">
        <h1 className="text-2xl font-[550] md:font-semibold text-foreground ">
          Edit Member's Details
        </h1>
        <p className="text-sm font-medium text-muted-foreground">{params.id}</p>
      </header>
    </main>
  );
};

export default MemberPage;