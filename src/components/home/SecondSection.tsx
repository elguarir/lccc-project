import React from "react";

const SecondSection = () => {
  return (
    <section className="py-24 -mt-6  rounded-t-xl">
      <div className="container flex flex-col justify-center gap-12 py-4 rounded-lg max-lg:px-2 lg:h-[500px] lg:flex-row">
        <div className="relative w-full h-full overflow-hidden rounded-xl max-lg:aspect-square max-h-[500px] mx-auto">
          <img
            className="object-cover w-full h-full"
            src="./images/image-11.jpeg"
            alt=""
          />
        </div>
        <div className="flex flex-col w-full h-full px-4 py-6 space-y-6 lg:px-8 text-dark">
          <h2 className="text-2xl font-semibold tracking-tight lg:text-4xl">
            Building Excellence, One Project at a Time.
          </h2>
          <p className="[text-wrap:balance] tracking-wide font-[450] leading-normal">
            Our mission is to manage technical risks with the aim of assisting
            and advising our clients and other stakeholders. We provide
            technical inspection services for all building trades, civil
            engineering and industrial control CND, and regulatory control of
            electrical installations, elevators, lifts, lifting and pressure
            equipment for gas and steam.
          </p>
          {/* stats */}
          <div className="flex relative items-center shadow-lg lg:-ml-[200px] justify-center w-full max-w-2xl lg:w-auto px-5 py-3 lg:px-4 lg:py-5 text-center rounded-xl  bg-primary-background gap-y-0 gap-x-6 lg:gap-x-4">
            <div className="flex flex-col justify-center w-full space-y-1 text-primary-foreground">
              <div className="text-xl font-bold tracking-tight lg:text-4xl">1260</div>
              <span className="text-sm lg:text-lg font-[450]">Projects</span>
            </div>
            <div className="flex flex-col justify-center w-full space-y-1 text-primary-foreground">
              <div className="text-xl font-bold tracking-tight lg:text-4xl">1000+</div>
              <span className="text-sm lg:text-lg font-[450]">
                Satisfied clients
              </span>
            </div>
            <div className="flex flex-col justify-center w-full space-y-1 text-primary-foreground">
              <div className="text-xl font-bold tracking-tight lg:text-4xl">4300</div>
              <span className="text-sm lg:text-lg font-[450]">
                Audits conducted
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
