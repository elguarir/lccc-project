import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const EventEditPage = (props: Props) => {
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
    </main>
  );
};

export default EventEditPage;
