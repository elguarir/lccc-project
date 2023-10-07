import BackButton from "@/components/editor/BackButton";
import PublishButton from "@/components/editor/PublishButton";
import EditorSideBar from "@/components/editor/shared/EditorSideBar";
import PlateEditor from "@/components/plate-editor";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useAuthSession from "@/hooks/useAuthSession";
import { GetArticleDataById } from "@/lib/helpers/GetArticleData";
import { TElement, Value } from "@udecode/plate-common";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";

interface EditorPageProps {
  params: {
    id: string;
  };
}
const EditorPage = async ({ params }: EditorPageProps) => {
  const id = params.id;
  const session = await useAuthSession();
  if (!session?.user) redirect("/sign-in");
  const userId = session.user.userId;

  const article = await GetArticleDataById(id, userId);
  if (!article) return notFound();

  return (
    <>
      <ScrollArea className="relative flex flex-col flex-1 w-full gap-4 px-4 mx-auto ">
        <ScrollBar orientation="vertical" />
        <ScrollBar orientation="horizontal" />
        <div className="w-full">
          <div className="flex flex-col w-full gap-4 py-8 xl:px-6 xl:gap-6">
            <div className="flex mx-auto max-w-[1200px] items-center justify-between w-full">
              <BackButton />
              <div>
                <PublishButton disabled={false} />
              </div>
            </div>
            <div className="mx-auto max-w-[1200px] h-full items-center w-full rounded-lg border bg-background shadow-sm">
              <div className="h-full">
                <PlateEditor initialData={article} />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      <EditorSideBar />
    </>
  );
};

export default EditorPage;
