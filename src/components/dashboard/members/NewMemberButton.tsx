"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const NewMemberButton = () => {
  return (
    <Button size={"sm"} asChild>
      <Link href={"/dashboard/members/create"}>
        <PlusIcon strokeWidth={2.5} className="w-4 h-4 mr-2" />
        New Member
      </Link>
    </Button>
  );
};

export default NewMemberButton;
