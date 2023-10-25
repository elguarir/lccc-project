"use client";
import React from "react";
import { trpc } from "@/server/client";
import { Skeleton } from "../../ui/skeleton";
import MemberCard from "./MemberCard";

const MembersTable = () => {
  const { data: members, isLoading } = trpc.member.getMembers.useQuery();

  if (isLoading) {
    return (
      <ul className="table w-full p-2 space-y-1 border-[1.35px] border-dashed rounded-lg border-muted-foreground/20">
        {[0, 1, 2, 4, 5, 6].map((_, idx) => (
          <Skeleton key={idx} className="w-full h-16" />
        ))}
      </ul>
    );
  }

  if (!members || members.length === 0) {
    return (
      <div className="flex items-center justify-center w-full p-4 border-[2px] border-dashed rounded-lg h-52">
        <div className="text-lg text-muted-foreground">
          You have not created any members yet.
        </div>
      </div>
    );
  }

  return (
    <ul className="table w-full overflow-hidden border-[2px] border-dashed divide-y rounded-lg divide-dashed">
      {members?.map((member) => <MemberCard key={member.id} member={member} />)}
    </ul>
  );
};

export default MembersTable;
