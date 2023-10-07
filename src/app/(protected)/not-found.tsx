import { Button } from "@/components/ui/button";
import { ChevronLeft, Ghost } from "lucide-react";
import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <>
      <div className="mx-auto max-w-[1200px] h-[calc(100vh-72px)] w-full rounded-lg  bg-background ">
        <div className="flex flex-col items-center justify-center h-full gap-4 px-2">
          <Ghost className="w-24 h-24 text-muted-foreground" />
          <span className="text-xl font-bold max-w-md text-center [text:balance]">
            This article does not exist. Please check the URL or create a new
            article.
          </span>
          <Link href={"/dashboard/articles/"}>
            <Button>
              <ChevronLeft className="mr-2" size={16} />
              Back to articles
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default notFound;
