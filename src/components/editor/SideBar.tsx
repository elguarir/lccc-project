"use client";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import useMediaQuery from "@/hooks/use-media-query";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ArticleDetails from "./ArticleDetails";
import { MoreVertical } from "lucide-react";
import { FormSchema } from "../../lib/validators/ArticleDetailsValidator";
import { Button } from "../ui/button";
import { TArticleById } from "@/server/routers/article";
import { memo, useEffect } from "react";

interface SideBarProps {
  article?: TArticleById;
}

const SideBar = ({ article }: SideBarProps) => {
  const { isMobile, isTablet } = useMediaQuery();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: article?.title ?? undefined,
      excerpt: article?.excerpt ?? undefined,
      coverImage: article?.main_image ?? undefined,
      publishedAt: article?.publishedAt ?? undefined,
      slug: article?.slug ?? undefined,
      tags: article?.tags ?? undefined,
      category: article?.category?.id ?? undefined,
    },
  });

  useEffect(() => {
    const isDirty = form.formState.isDirty;
    if (isDirty) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
    return () => {
      window.onbeforeunload = null;
    };
  }, [form.formState.isDirty]);

  if (isMobile || isTablet)
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant={"ghost"}
            className="absolute w-9 h-9 !p-0 right-4 top-4"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="p-0 w-full  max-w-[390px]">
          <aside className="flex flex-col w-full h-[100dvh] mb-10">
            <header className="sticky top-0 p-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Article details</h3>
            </header>
            <div className="flex-1 overflow-y-auto">
              <ScrollArea scrollHideDelay={1000} className="h-full">
                <ScrollBar orientation="vertical" />
                <div className="flex flex-1 px-6 py-4 pb-6">
                  <ArticleDetails articleId={article!!.id} formState={form} />
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
            <ArticleDetails articleId={article!!.id} formState={form} />
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default memo(SideBar);
