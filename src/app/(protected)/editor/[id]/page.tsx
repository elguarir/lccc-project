import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronLeft, Plus, Subtitles } from "lucide-react";
import SideBar from "@/components/editor/SideBar";
import { notFound } from "next/navigation";
import CoverImageUpload from "@/components/editor/CoverImageUpload";
import Editor from "@/components/editor/editor";
import { getArticleById, getArticleRevisions } from "@/server/routers/article";
import { auth } from "@clerk/nextjs";
import ArticleStatus from "@/components/editor/ArticleStatus";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Await } from "@/components/shared/Await";
import { Icons } from "@/assets/icons";
import AddRevision from "@/components/editor/AddRevision";
import Revisions from "@/components/editor/Revisions";
import RevisionsCount from "@/components/editor/RevisionsCount";
import { Suspense } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";

interface EditorPageProps {
  params: {
    id: string;
  };
}
const EditorPage = async ({ params }: EditorPageProps) => {
  let { userId } = auth();
  if (!userId) return notFound();

  let article = await getArticleById({ id: params.id });
  let currentUser = await useCurrentUser();
  if (!article) return notFound();

  // Check if the current user is an admin or the author of the article
  if (!(currentUser?.role === "admin" || article.author.id === userId))
    return notFound();
  let revisions = getArticleRevisions({ id: params.id });

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
                <a href={"/dashboard/articles"}>
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
      <Popover>
        <PopoverTrigger className="absolute bottom-6 left-6" asChild>
          <Button variant={"outline"} size={"icon"}>
            <Icons.notesIcon className="w-5 h-5" />
            <RevisionsCount articleId={article!.id} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="start"
          className="mb-1 w-[400px] max-w-full flex flex-col gap-4"
        >
          <div className="text-xl font-semibold tracking-wide">Revisions</div>
          <Suspense
            fallback={
              <div className="text-sm font-medium tracking-wide text-muted-foreground">
                Loading...
              </div>
            }
          >
            <Await promise={revisions}>
              {(revisions) => {
                return (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                      <Revisions
                        articleId={article!.id}
                        initialData={revisions}
                      />
                    </div>
                    {currentUser!.role === "admin" && (
                      <div className="flex items-center justify-end w-full mt-6">
                        <AddRevision articleId={article!.id} />
                      </div>
                    )}
                  </div>
                );
              }}
            </Await>
          </Suspense>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EditorPage;
