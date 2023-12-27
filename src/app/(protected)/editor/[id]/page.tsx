import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import ArticleEditor from "@/components/editor/ArticleEditor";
import ArticleDetails from "@/components/editor/ArticleDetails";

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
          <ArticleEditor />
        </main>
      </div>
      <aside className="h-screen hidden lg:flex flex-col border-l overflow-hidden w-full max-w-[390px] z-[2] border-border">
        <header className="sticky shadow-sm z-[3] top-0 p-6 py-4 border-b border-border  bg-background">
          <h3 className="text-lg font-semibold">Article details</h3>
        </header>
        <div className="flex-1 overflow-y-auto">
          <ScrollArea scrollHideDelay={1000} className="h-full">
            <ScrollBar orientation="vertical" />
            <div className="flex flex-1 px-6 py-4 pb-6">
              <ArticleDetails />
            </div>
          </ScrollArea>
        </div>
      </aside>
    </div>
  );
};

export default EditorPage;
