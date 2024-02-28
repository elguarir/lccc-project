import { Await } from "@/components/shared/Await";
import { ArticleCard } from "@/components/site/ArticlesSection";
import { EventCard } from "@/components/site/EventsSection";
import { cn } from "@/lib/utils";
import db from "@/prisma";
import { getPublishedArticles } from "@/server/routers/article";
import { getEvents } from "@/server/routers/event";
import Link from "next/link";
import React, { Suspense } from "react";

type Props = {};

const ArticlesPage = async (props: Props) => {
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
  let events = await getEvents();
  return (
    <main className="flex flex-col w-full py-16 lg:py-24">
      <h1 className="text-3xl font-bold tracking-tight font-heading md:text-5xl">
        Latest Events
      </h1>
      <div className="py-2">
        <p className="text-muted-foreground text-balance max-w-prose"></p>
      </div>

      <div className="grid grid-cols-1 gap-12 pt-12">
        {events.length === 0 && (
          <div className="flex items-center justify-center flex-1 w-full min-h-80">
            <h1 className="text-xl font-medium text-center">
              No events hosted yet!
            </h1>
          </div>
        )}
        {events.map((evt) => (
          <EventCard
            key={evt.id}
            title={evt.title}
            slug={evt.slug}
            eventDate={evt.eventDate}
            description={evt.description}
            id={evt.id}
            mainImage={evt.mainImage}
            excerpt={evt.excerpt}
            location={evt.location}
          />
        ))}
      </div>
    </main>
  );
};

export default ArticlesPage;
