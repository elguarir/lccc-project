"use client";
import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronLeft, Loader2, Subtitles, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as RadioGroup from "@radix-ui/react-radio-group";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, sleep } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { TSearchResponse } from "@/types/unsplash";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "@/lib/env/client";

interface EditorPageProps {
  params: {
    id: string;
  };
}
const EditorPage = ({ params }: EditorPageProps) => {
  return (
    <div className="relative flex flex-1 w-full h-screen">
      <div className="container flex flex-col w-full h-screen py-8 max-sm:px-3">
        <header className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant={"ghost"}
              className="font-medium"
              size={"sm"}
            >
              <Link href={"/dashboard"}>
                <ChevronLeft className="mr-2" size={16} />
                Back
              </Link>
            </Button>
            <span className="text-sm font-medium text-muted-foreground">
              Published
            </span>
          </div>
        </header>
        <main className="flex flex-col flex-1 w-full h-full max-w-4xl py-6 mx-auto lg:py-16 lg:px-4">
          <div className="grid w-full gap-y-6">
            <div className="flex items-center gap-3">
              <CoverImageUpload />
              <Button
                type="button"
                variant={"ghost"}
                size={"xs"}
                className="px-4 rounded-full text"
              >
                <Subtitles className="w-4 h-4 mr-2" />
                Add Subtitle
              </Button>
            </div>
            <div className="">
              <input
                type="text"
                placeholder="Article title..."
                className="w-full outline-none font-heading p-2 font-semibold text-3xl placeholder:font-semibold placeholder:text-3xl placeholder:text-muted-foreground rounded-[0.75rem] focus:outline-none"
              />
            </div>
          </div>
        </main>
      </div>
      <aside className="h-screen hidden lg:flex flex-col border-l overflow-hidden min-w-[380px] z-[2] border-border">
        <header className="sticky z-[3] top-0 p-6 py-4 border-b bg-background">
          <h3 className="text-lg font-semibold">Article details</h3>
        </header>
        <div className="flex-1 overflow-y-auto">
          <ScrollArea className="h-full px-6 py-4">
            <ScrollBar orientation="vertical" />
            <div className="flex flex-1 h-screen"></div>
          </ScrollArea>
        </div>
      </aside>
    </div>
  );
};

export default EditorPage;

const CoverImageUpload = () => {
  let [open, setOpen] = useState(false);
  const [images, setImages] = useState<TSearchResponse["results"] | null>(null);

  let formRef = React.useRef<HTMLFormElement>(null);
  const { mutate: searchImages, isLoading: isSearching } = useMutation({
    mutationFn: async (query: string) => {
      const base_url = "https://api.unsplash.com";
      const res = await axios.get(`${base_url}/search/photos`, {
        headers: {
          Authorization: `Client-ID ${env.NEXT_PUBLIC_UNSPLASH_CLIENTID}`,
        },
        params: {
          query: query,
          per_page: 50,
        },
      });
      await sleep(200);
      return res.data as TSearchResponse;
    },
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={"ghost"}
          size={"xs"}
          className="px-4 rounded-full text"
        >
          <Icons.CoverImage className="w-4 h-4 mr-2" />
          Add Cover
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        className="w-[calc(100vw-20px)] p-0 rounded-sm sm:w-[calc(100vw-160px)] lg:w-[580px] mt-1"
      >
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="flex items-center justify-between w-full px-3 py-2 border-b rounded-none bg-inherit">
            <div className="space-x-1">
              <TabsTrigger
                className="hover:bg-primary-100/40 dark:hover:bg-muted relative bg-background data-[state=active]:shadow-none data-[state=active]:hover:bg-primary-100 py-1 data-[state=active]:text-primary data-[state=active]:after:content-[''] after:pointer-events-none after:absolute after:hidden data-[state=active]:after:block transition-all duration-200 after:bottom-[-0.5rem] after:h-0.5 after:w-full after:bg-primary-600"
                value="upload"
              >
                Upload
              </TabsTrigger>
              <TabsTrigger
                className="hover:bg-primary-100/40 dark:hover:bg-muted relative bg-background data-[state=active]:shadow-none data-[state=active]:hover:bg-primary-100 py-1 data-[state=active]:text-primary data-[state=active]:after:content-[''] after:pointer-events-none after:absolute after:hidden data-[state=active]:after:block transition-all duration-200 after:bottom-[-0.5rem] after:h-0.5 after:w-full after:bg-primary-600"
                value="unsplash"
              >
                Unsplash
              </TabsTrigger>
            </div>
            <Button
              className="rounded-full w-7 h-7"
              size={"icon"}
              type="button"
              variant={"ghost"}
              onClick={() => setOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </TabsList>
          <TabsContent className="px-3 pt-2 pb-4" value="upload">
            <div className="flex flex-col items-center justify-center w-full h-32 gap-2 border-2 border-dashed rounded-md border-primary-400/20">
              <Button
                variant={"outline"}
                size={"xs"}
                className="px-4 py-1 text-xs rounded-full h-7"
              >
                <Icons.cloudUpload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              <span className="text-xs font-medium text-muted-foreground">
                Recommended dimension is 1600 x 840
              </span>
            </div>
          </TabsContent>
          <TabsContent className="px-3 pt-2 pb-4" value="unsplash">
            <div className="grid w-full gap-2">
              <form
                ref={formRef}
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(formRef.current!);
                  const query = formData.get("query");
                  if (query) {
                    searchImages(query as string, {
                      onSuccess: (data) => {
                        setImages(data.results);
                      },
                    });
                  }
                }}
                className="flex w-full gap-2"
              >
                <div className="relative w-full">
                  <Icons.search className="absolute text-muted-foreground inset-y-0 top-0.5 w-4 h-4 translate-y-1/2 left-3" />
                  <Input
                    name="query"
                    type="text"
                    className="px-9 h-9"
                    placeholder="Type something and press enter"
                    autoComplete="off"
                  />
                  {isSearching && (
                    <>
                      <span className="absolute focus-visible:outline-primary rounded-full text-muted-foreground inset-y-0 top-0.5 w-4 h-4 translate-y-1/2 right-3">
                        <Loader2 className="animate-spin w-3.5 h-3.5" />
                      </span>
                    </>
                  )}
                </div>
                <Button type="submit" disabled={isSearching} size={"sm"}>
                  Search
                </Button>
              </form>
              <RadioGroup.Root asChild>
                <ScrollArea
                  className={`px-3 ${
                    images === null || images.length === 0 ? "h-auto" : "h-80"
                  }`}
                >
                  <div
                    className={cn(
                      "grid grid-cols-2 gap-2  mt-3 ",
                      (images?.length !== 0 || images === null) && "pb-4",
                    )}
                  >
                    {isSearching ? (
                      [...Array(10)].map((_, idx) => (
                        <div
                          key={idx}
                          className="relative w-full overflow-hidden rounded-md aspect-video"
                        >
                          <Skeleton className="object-cover w-full h-full" />
                        </div>
                      ))
                    ) : images === null ? (
                      <div className="flex items-center justify-center w-full h-28 col-span-full">
                        <span className="text-sm font-medium">
                          Search results will appear here.
                        </span>
                      </div>
                    ) : images.length === 0 ? (
                      <div className="flex items-center justify-center w-full h-28 col-span-full">
                        <span className="text-sm font-medium">
                          No images found.
                        </span>
                      </div>
                    ) : (
                      images?.map((image) => (
                        <RadioGroup.Item
                          className="transition-all aria-[checked=true]:border-primary border-2 border-transparent hover:border-primary"
                          value={image.urls.regular}
                          asChild
                          key={image.id}
                        >
                          <button className="relative w-full overflow-hidden rounded-md aspect-video">
                            <img
                              src={image.urls.regular}
                              alt={image.alt_description ?? ""}
                              className="object-cover w-full h-full"
                            />
                          </button>
                        </RadioGroup.Item>
                      ))
                    )}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </RadioGroup.Root>
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
