import EventsTable from "@/components/dashboard/events/EventsTable";
import { Button } from "@/components/ui/button";
import db from "@/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const EventsPage = async () => {
  let events = await db.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="flex flex-col items-center w-full py-3 md:py-5">
      <header className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-[550] md:font-semibold text-foreground ">
          Events
        </h1>
        <Button
          size={"sm"}
          className="flex items-center justify-center px-4"
          asChild
        >
          <Link href={"/dashboard/events/new"}>
            <span className="mr-2">New</span>
            <Plus className="w-4 h-4" />
          </Link>
        </Button>
      </header>
      <EventsTable initialData={events} />
    </main>
  );
};

export default EventsPage;
