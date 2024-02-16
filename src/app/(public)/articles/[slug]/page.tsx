import { BlockRenderer } from "@/components/editor/BlockRenderer";
import ArticleComments from "@/components/site/articles/ArticleComments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getArticleBySlug } from "@/server/routers/article";
import { getComments } from "@/server/routers/comment";
import { OutputData } from "@editorjs/editorjs";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { cache } from "react";
// import {getComments} = "@/"
type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 3600;

const ArticlePage = async (props: Props) => {
  let article = await getArticle(props.params.slug);

  if (!article) {
    return notFound();
  }
  let comments = await getComments({ id: article.id });
  return (
    <main className="flex flex-col w-full py-16 md:max-w-3xl md:mx-auto lg:py-24">
      <div className="flex flex-col pb-8 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {article.title}
        </h1>
        <img
          src={article?.main_image ?? ""}
          className="object-cover w-full rounded-md shadow aspect-video"
          alt={article.title ?? "Cover image"}
        />
        <div className="flex flex-wrap items-center justify-center w-full gap-4 p-4 font-mono max-md:px-1 md:gap-7 border-y border-border/50">
          <div className="flex items-center gap-3">
            <Avatar className="rounded-full w-7 h-7">
              <AvatarImage
                src={article.author.avatar_url ?? ""}
                alt={article.author.first_name}
              />
              <AvatarFallback>
                {article.author.first_name[0]}
                {article.author.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-1 text-sm font-medium">
              <div>
                By{" "}
                <Link
                  href={`/authors/${article.author.username}`}
                  className="font-semibold transition-colors hover:text-primary dark:hover:text-primary-400"
                >
                  {article.author.first_name} {article.author.last_name}
                </Link>
              </div>
            </div>
          </div>
          <Separator orientation="vertical" className="details-separator" />
          <div className="flex items-center">
            <Link href={`/category/${article.category?.slug}`}>
              <Badge
                className="text-sm font-medium transition-colors hover:text-muted-foreground/90"
                variant={"outline"}
              >
                {article.category?.name}
              </Badge>
            </Link>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="text-sm font-medium uppercase">
            {format(new Date(article.publishedAt ?? ""), "MMM d, yyyy")}
          </div>
        </div>
      </div>
      <div className="prose w-full max-w-full prose-base marker:text-muted-foreground text-foreground dark:prose-code:bg-gray-600/80 prose-code:bg-gray-200/80 prose-a:text-foreground prose-a:transition-colors hover:prose-a:text-primary prose-code:rounded-[2px] prose-code:px-px prose-code:py-px prose-code:font-mono prose-neutral dark:prose-invert prose-p:!mt-0 prose-p:!mb-3">
        {(article.content as OutputData | null)?.blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-6">
        Tags:
        {article.tags.map((tag) => (
          <Badge
            className="px-3 font-medium transition-colors hover:text-muted-foreground/90"
            variant={"outline"}
          >
            <Link href={`/tag/${tag.slug}`}>{tag.name}</Link>
          </Badge>
        ))}
      </div>
      <Separator orientation="horizontal" className="w-full my-10" />
      <ArticleComments initialData={comments} articleId={article.id} />
    </main>
  );
};

export default ArticlePage;

const getArticle = cache(async (slug: string) => {
  let article = await getArticleBySlug(slug);
  return article;
});
