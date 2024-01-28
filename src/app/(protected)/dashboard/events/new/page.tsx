import EventForm from "@/components/dashboard/events/EventCreationForm";
import React from "react";

const NewEventPage = () => {
  return (
    <main className="flex flex-col items-center w-full py-3 md:py-5">
      <header className="flex flex-col justify-between w-full gap-1">
        <h1 className="text-3xl font-[550] md:font-semibold text-foreground ">
          Create Event
        </h1>
        <p className="text-sm text-muted-foreground font-[450]">
          Fill out the form below to create a new event, and submit the form
          when you are done.
        </p>
      </header>

      <div className="w-full pt-6">
        <EventForm mode="create" />
      </div>
    </main>
  );
};

export default NewEventPage;
