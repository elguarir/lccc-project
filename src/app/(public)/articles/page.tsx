import { Await } from "@/components/shared/Await";
import { ArticleCard } from "@/components/site/ArticlesSection";
import { cn } from "@/lib/utils";
import db from "@/prisma";
import { getPublishedArticles } from "@/server/routers/article";
import Link from "next/link";
import React, { Suspense } from "react";

type Props = {
  searchParams: { category: string | undefined };
};

const ArticlesPage = async ({ searchParams }: Props) => {
  let dummyArticles = [
    {
      title: "Concept Art & Illustrations by Stef Euphoria",
      slug: "concept-art-illustrations-by-stef-euphoria",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      image: "https://preview.cruip.com/creative/images/blog-01.jpg",
      author: {
        avatar: "https://preview.cruip.com/creative/images/blog-author-01.jpg",
        name: "Stef Euphoria",
        username: "stef-euphoria",
      },
    },
    {
      title: "Patrick Chen's Branding by Thought & Found Studio",
      slug: "patrick-chens-branding-by-thought-and-found-studio",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      image: "https://preview.cruip.com/creative/images/blog-02.jpg",
      author: {
        avatar: "https://preview.cruip.com/creative/images/blog-author-02.jpg",
        name: "Samuel Regan",
        username: "samuel-regan",
      },
    },
    {
      title: "Soma Brewing Branding & Packaging by Quim Martin",
      slug: "patrick-chens-branding-by-thought-and-found-studio",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      image: "https://preview.cruip.com/creative/images/blog-03.jpg",
      author: {
        avatar: "https://preview.cruip.com/creative/images/blog-author-03.jpg",
        name: "Fabian Centero",
        username: "fabian-centero",
      },
    },
  ];
  let category = searchParams.category;
  let latestPublisedArticles = getPublishedArticles();
  let categories = await db.category.findMany();
  return (
    <main className="flex flex-col w-full py-16 lg:py-24">
      <h1 className="text-3xl font-bold tracking-tight font-heading md:text-5xl">
        Latest Articles
      </h1>
      <div className="py-2">
        <p className="text-muted-foreground text-balance max-w-prose">
          Welcome to our blog! Here, you'll find a the latest articles published
          by club members. Happy reading!
        </p>
      </div>

      <div className="flex flex-wrap items-center w-full gap-3 pt-16">
        <Link
          href="/articles"
          className={cn(
            "text-sm focus-visible:outline-primary shadow-sm border font-medium rounded-full transition-colors duration-300 px-3 py-0.5",
            category === undefined && "bg-primary text-primary-foreground border-none",
            category !== undefined && "hover:bg-accent",
          )}
        >
          All
        </Link>
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/articles?category=${category.slug}`}
            prefetch
            className={cn(
              "text-sm focus-visible:outline-primary shadow-sm border font-medium rounded-full transition-colors duration-300 px-3 py-0.5",
              category.slug === searchParams.category &&
                "bg-primary text-primary-foreground border-none",
              category.slug !== searchParams.category && "hover:bg-accent",
            )}
          >
            {category.name}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-12 pt-8 md:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={
            <>
              {dummyArticles.map((article, index) => (
                <ArticleCard key={index} {...article} skeleton />
              ))}
            </>
          }
        >
          <Await promise={latestPublisedArticles}>
            {(articles) => {
              let filteredArticles = articles.filter((article) => {
                if (category === undefined) {
                  return true;
                }
                return article.category?.slug === category;
              });
              if (filteredArticles.length === 0) {
                return (
                  <div className="flex items-center justify-center flex-1 w-full min-h-80">
                  <h1 className="text-xl font-medium text-center">
                    No articles found!
                  </h1>
                </div>
                );
              }
              return (
                <>
                  {filteredArticles.map((article, index) => (
                    <ArticleCard
                      key={article.id}
                      title={article.title ?? ""}
                      slug={article.slug ?? ""}
                      excerpt={article.excerpt ?? ""}
                      image={article.main_image ?? ""}
                      author={{
                        name:
                          article.author.first_name +
                          " " +
                          article.author.last_name,
                        username: article.author.username,
                        avatar: article.author.avatar_url ?? "",
                      }}
                    />
                  ))}
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </main>
  );
};

export default ArticlesPage;
