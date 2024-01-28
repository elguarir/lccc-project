"use client";
import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { trpc } from "@/server/client";
import { Event } from "@prisma/client";

const EventsTable = ({ initialData }: { initialData: Event[] }) => {
  let { data: events } = trpc.event.getEvents.useQuery(undefined, {
    initialData,
  });

  return (
    <div className="flex flex-col w-full mt-8 md:p-3">
      <DataTable data={formatEvents(events)} columns={columns} />
    </div>
  );
};

export default EventsTable;

let formatEvents = (events: Event[]) => {
  return events.map((event) => {
    return {
      event: {
        id: event.id,
        title: event.title,
        mainImage: event.mainImage,
      },
      location: event.location,
      eventDate: event.eventDate,
      status: event.status,
    };
  });
};
