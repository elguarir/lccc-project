import AddNew from "@/components/dashboard/events/AddNew";
import React from "react";

const EventsPage = () => {
  return (
    <main className="flex flex-col items-center w-full py-3 md:py-5">
      <header className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-[550] md:font-semibold text-foreground ">
          Events
        </h1>
        <AddNew />
      </header>
    </main>
  );
};

export default EventsPage;
