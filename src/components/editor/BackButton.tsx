"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useEditorStore } from "@/store/EditorStore";

const BackButton = () => {
  const saving = useEditorStore((state) => state.saving);
  const status = useEditorStore((state) => state.article?.status);


  return (
    <div className="flex items-center gap-2">
      <Button variant={"ghost"} asChild>
        <Link href={"/dashboard/articles"}>
          <ChevronLeft className="mr-2" size={16} />
          Back
        </Link>
      </Button>
      <span className="text-sm font-medium text-muted-foreground">
        {saving
          ? ` ${toTitle(status)} - Saving...`
          : ` ${toTitle(status)} - Saved`}
      </span>
    </div>
  );
};

export default BackButton;

const toTitle = (str?: string) => {
  if (!str) return "";
  return str.charAt(0) + str.slice(1).toLocaleLowerCase();
};
