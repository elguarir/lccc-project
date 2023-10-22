"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const NewServiceButton = () => {
  return (
    <Button loadingText="Creating..."  size={"sm"} asChild>
      <Link href={"/dashboard/services/create"}>
        <PlusIcon strokeWidth={2.5} className="w-4 h-4 mr-2" />
        New Service
      </Link>
    </Button>
  );
};

export default NewServiceButton;
