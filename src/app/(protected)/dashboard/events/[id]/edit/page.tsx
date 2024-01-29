import EventForm from "@/components/dashboard/events/EventForm";
import db from "@/prisma";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const EventEditPage = async (props: Props) => {
  let { id } = props.params;
  let event = await db.event.findUnique({
    where: {
      id,
    },
  });

  if (!event) {
    return notFound();
  }
  return (
    <main className="flex flex-col items-center w-full py-3 md:py-5">
      <header className="flex flex-col w-full gap-1">
        <h1 className="text-2xl font-[550] md:font-semibold text-foreground ">
          Edit Event Details
        </h1>
        <p className="text-sm text-muted-foreground">
          Edit event details, don't forget to save changes.
        </p>
      </header>

      <div className="w-full py-6 pb-8">
        <EventForm
          mode="edit"
          event={{
            id: event.id,
            initialData: {
              title: event.title,
              description: event.description,
              location: event.location,
              slug: event.slug,
              status: event.status,
              eventDate: event.eventDate,
              excerpt: event.excerpt,
              mainImage: event.mainImage,
            },
          }}
        />
      </div>
    </main>
  );
};

export default EventEditPage;
