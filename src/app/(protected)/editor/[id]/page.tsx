import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronLeft, Subtitles } from "lucide-react";
import Link from "next/link";
import ArticleEditor from "@/components/editor/ArticleEditor";
import SideBar from "@/components/editor/SideBar";
import db from "@/prisma";
import { notFound } from "next/navigation";
import CoverImageUpload from "@/components/editor/CoverImageUpload";
import Editor from "@/components/editor/editor";
import { getArticleById } from "@/server/routers/article";

interface EditorPageProps {
  params: {
    id: string;
  };
}
const EditorPage = async ({ params }: EditorPageProps) => {
  let article = await getArticleById(params.id);

  if (!article) notFound();
  return (
    <div className="relative flex flex-1 w-full h-screen">
      <ScrollArea className="w-full h-screen">
        <ScrollBar orientation="vertical" />

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
            <div className="grid w-full gap-y-8">
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
              <div className="grid w-full gap-2">
                <div className="relative w-full py-3">
                  <Editor initialValue={article.content as any} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </ScrollArea>
      <SideBar article={article} />
    </div>
  );
};

export default EditorPage;
