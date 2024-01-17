import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronLeft, Subtitles } from "lucide-react";
import SideBar from "@/components/editor/SideBar";
import { notFound } from "next/navigation";
import CoverImageUpload from "@/components/editor/CoverImageUpload";
import Editor from "@/components/editor/editor";
import { getArticleById } from "@/server/routers/article";
import { auth } from "@clerk/nextjs";
import ArticleStatus from "@/components/editor/ArticleStatus";

interface EditorPageProps {
  params: {
    id: string;
  };
}
const EditorPage = async ({ params }: EditorPageProps) => {
  let { userId } = auth();
  if (!userId) return notFound();
  let article = await getArticleById({ id: params.id, userId });

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
                <a href={"/dashboard"}>
                  <ChevronLeft className="mr-2" size={16} />
                  Back
                </a>
              </Button>
              <ArticleStatus />
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
                  <Editor
                    articleId={article.id}
                    initialValue={article.content as any}
                  />
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
