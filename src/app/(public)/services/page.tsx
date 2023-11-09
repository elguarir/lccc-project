import { getServices } from "@/server/routers/service";
import { RouterOutput } from "@/types/router";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const page = async () => {
  const services = await getServices();

  return (
    <div className="py-8 lg:py-20">
      <div className="container space-y-2">
        <h1 className="text-xl font-bold lg:text-3xl xl:text-5xl">
          Our Services
        </h1>
        <div className="flex items-center gap-2 !mt-1 text-sm font-semibold tracking-wide">
          <Link
            className="transition-colors duration-200 hover:text-primary-background"
            href={"/"}
          >
            SOMACEP
          </Link>{" "}
          •{" "}
          <Link
            className="transition-colors duration-200 hover:text-primary-background"
            href={"/services"}
          >
            Services
          </Link>
        </div>
        <p className="text-sm !mt-3 leading-relaxed [text-wrap:balance] max-w-5xl font-medium text-muted-foreground">
          Experience unrivaled construction excellence. Our services deliver
          impeccable quality, expert craftsmanship, and seamless project
          management. From residential havens to commercial masterpieces, we
          bring your vision to life with passion and precision. Trust us to
          exceed your expectations and redefine construction excellence.
        </p>
      </div>

      <div
        style={{
          backgroundImage: "url('/images/services-banner.png')",
        }}
        className="object-cover py-24 bg-no-repeat"
      >
        <div className="container grid grid-cols-1 gap-6 mx-auto mt-24 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;

const ServiceCard = ({
  service,
}: {
  service: RouterOutput["service"]["getServices"][0];
}) => {
  return (
    <div className="w-full max-w-full mb-8 overflow-hidden transition-all duration-300 border rounded-sm border-input group bg-neutral-100">
      <div className="relative transition-all duration-300 translate-y-0">
        <img src={service.Image} className="object-cover w-full h-64" />
      </div>
      <div className="px-[1.8rem] py-6 bg-no-repeat relative z-[3] rounded-sm transition-all duration-300">
        <h3 className="mb-2 text-xl font-semibold tracking-tight transition-colors duration-200 hover:text-primary-background">
          <Link href={`/services/${service.slug}`}>{service.name}</Link>
        </h3>
        <p className="text-sm font-[450] line-clamp-4">{service.description}</p>
        <div className="transition-all duration-300 opacity-0 group-hover:opacity-100">
          <Link
            href={"/services/" + service.slug}
            className="inline-block mt-4 text-sm font-bold text-primary hover:text-primary-dark"
          >
            Read More
            <DoubleArrowRightIcon
              strokeWidth={3}
              className="inline-block w-4 h-4 ml-0 transition-all duration-200 group-hover:ml-2"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
