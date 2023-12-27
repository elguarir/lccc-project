"use client";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import useMediaQuery from "@/hooks/use-media-query";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ArticleDetails from "./ArticleDetails";
import { ArrowBigLeftDash } from "lucide-react";
import { FormSchema } from "./FormSchema";
import { Button } from "../ui/button";

const SideBar = () => {
  const { isMobile, isTablet } = useMediaQuery();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      slug: "my-first-article",
      tags: ["react", "typescript"],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  if (isMobile || isTablet)
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant={"outline"}
            className="absolute w-10 p-0 right-4 top-4"
            size={"sm"}
          >
            <ArrowBigLeftDash className="" size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent className="p-0 w-full  max-w-[390px]">
          <aside className="flex flex-col w-full h-screen pb-6">
            <header className="sticky top-0 p-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Article details</h3>
            </header>
            <div className="flex-1 overflow-y-auto">
              <ScrollArea scrollHideDelay={1000} className="h-full">
                <ScrollBar orientation="vertical" />
                <div className="flex flex-1 px-6 py-4 pb-6">
                  <ArticleDetails formState={form} onSubmit={onSubmit} />
                </div>
              </ScrollArea>
            </div>
          </aside>
        </SheetContent>
      </Sheet>
    );

  return (
    <aside className="h-screen hidden lg:flex flex-col border-l overflow-hidden w-full max-w-[390px] z-[2] border-border">
      <header className="sticky shadow-sm z-[3] top-0 p-6 py-4 border-b border-border  bg-background">
        <h3 className="text-lg font-semibold">Article details</h3>
      </header>
      <div className="flex-1 overflow-y-auto">
        <ScrollArea scrollHideDelay={1000} className="h-full">
          <ScrollBar orientation="vertical" />
          <div className="flex flex-1 px-6 py-4 pb-6">
            <ArticleDetails formState={form} onSubmit={onSubmit} />
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default SideBar;
