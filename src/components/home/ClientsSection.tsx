import React from "react";

const ClientsSection = () => {
  return (
    <section className="object-cover py-24">
      <div className="container">
        <div className="relative w-full gap-6 px-5 text-neutral-600">
          <div className="grid w-full gap-3 -mt-10 [text-wrap:balance] lg:max-w-prose mx-auto">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase whitespace-nowrap">
              <span className="w-[20px] h-[2.7px] rounded-sm bg-primary-background" />
              Our Clients
            </div>
            <h2 className="text-3xl text-center lg:text-4xl font-[700] lg:font-[800] leading-8 lg:leading-10 [text-wrap:balance] ">
              Clients We Worked With!
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-12 mt-16 place-items-center place-content-center">
          <div className="w-32 transition-all duration-300 cursor-pointer grayscale hover:grayscale-0 hover:scale-90">
            <img src="/images/maroc_telecom.png" alt="" />
          </div>
          <div className="w-32 transition-all duration-300 cursor-pointer grayscale hover:grayscale-0 hover:scale-90">
            <img src="/images/ram_logo.png" alt="" />
          </div>
          <div className="w-32 transition-all duration-300 cursor-pointer grayscale hover:grayscale-0 hover:scale-90">
            <img src="/images/Picture2.png" alt="" />
          </div>
          <div className="w-32 transition-all duration-300 cursor-pointer grayscale hover:grayscale-0 hover:scale-90">
            <img src="/images/fenie.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
