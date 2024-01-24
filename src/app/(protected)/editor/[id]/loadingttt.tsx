import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const Loading = () => {
  return (
    <>
      <>
        <ScrollArea className="relative flex flex-col flex-1 w-full gap-4 px-4 mx-auto ">
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
          <div className="w-full">
            <div className="flex flex-col gap-4 py-8 xl:px-6 xl:gap-6">
              <div className="flex mx-auto  max-w-[1200px] items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Button
                    variant={"ghost"}
                    asChild
                    className="opacity-50 pointer-events-none"
                  >
                    <Link href={"/dashboard/articles"}>
                      <ChevronLeft className="mr-2" size={16} />
                      Back
                    </Link>
                  </Button>
                </div>
                
              </div>
              <div className="mx-auto max-w-[1200px] h-full items-center w-full rounded-lg border bg-background shadow-sm">
                <div className="h-full">
                  <Skeleton className="h-[549px] w-full max-w-[1200px] mx-auto flex items-center justify-center" />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        {/* <EditorSideBar skelaton /> */}
      </>
    </>
  );
};

export default Loading;
