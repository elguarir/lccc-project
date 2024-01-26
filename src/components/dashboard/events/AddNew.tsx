"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const AddNew = () => {
  return (
    <Button
      size={"sm"}
      className="flex items-center justify-center px-4"
      asChild
    >
      <Link href={"/dashboard/events/new"}>
        <span className="mr-2">New</span>
        <Plus className="w-4 h-4" />
      </Link>
    </Button>
  );
};

export default AddNew;
