import { getServices } from "@/server/routers/service";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import type { RouterOutput } from "@/types/router";
const ServicesSection = async () => {
  const services = await getServices();

  return (
    <section
      className="object-cover py-24 bg-no-repeat bg-dark"
      style={{
        backgroundImage: "url('/images/sbg.png')",
      }}
    >
      <div className="container">
        <div className="grid w-full gap-6 px-5 lg:gap-20 lg:grid-cols-12 text-neutral-50">
          <div className="grid w-full gap-2 -mt-10 col-span-full lg:col-span-6">
            <div className="flex items-center gap-2 text-xs font-semibold whitespace-nowrap">
              <span className="w-[20px] h-[2.7px] rounded-sm bg-primary-background" />
              OUR SERVICES
            </div>
            <h2 className="text-3xl lg:text-4xl font-[800] leading-8 lg:leading-10 [text-wrap:balance] ">
              We Prodvide Quality Construction Services
            </h2>
          </div>
          <div className="w-full col-span-full lg:pl-4 lg:col-span-6">
            <p className="text-sm lg:text-base font-[450] [text-wrap:balance] leading-normal text-neutral-300">
              Experience unrivaled construction excellence. Our services deliver
              impeccable quality, expert craftsmanship, and seamless project
              management. From residential havens to commercial masterpieces, we
              bring your vision to life with passion and precision. Trust us to
              exceed your expectations and redefine construction excellence.
            </p>
          </div>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-6 mx-auto lg:px-10 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

const ServiceCard = ({
  service,
}: {
  service: RouterOutput["service"]["getServices"][0];
}) => {
  return (
    <div className="w-full max-w-full mb-8 overflow-hidden transition-all duration-300 rounded-sm group bg-neutral-100">
      <div className="relative transition-all duration-300 translate-y-0">
        <img src={service.Image} className="object-cover w-full h-64" />
      </div>
      <div className="px-[1.8rem] py-6 bg-no-repeat relative z-[3] rounded-sm transition-all duration-300">
        {/* <div className="svg-content">
          <svg
            className="top-svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="374px"
            height="63px"
          >
            <path
              fillRule="evenodd"
              d="M0.000,13.000 C0.000,13.000 72.000,77.250 159.000,59.000 C246.000,40.750 324.750,14.750 370.000,30.000 L370.000,19.000 C370.000,19.000 355.000,-4.750 164.000,47.000 C164.000,47.000 73.250,71.000 0.000,-0.000 L0.000,13.000 Z"
            />
          </svg>
          <svg
            className="bottom-svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="374px"
            height="63px"
          >
            <path
              fillRule="evenodd"
              d="M0.000,13.000 C0.000,13.000 72.000,77.250 159.000,59.000 C246.000,40.750 324.750,14.750 370.000,30.000 L370.000,19.000 C370.000,19.000 355.000,-4.750 164.000,47.000 C164.000,47.000 73.250,71.000 0.000,-0.000 L0.000,13.000 Z"
            />
          </svg>
          <svg
            className="bottom-svgw"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="374px"
            height="57px"
          >
            <path
              fillRule="evenodd"
              fill="rgb(255, 255, 255)"
              d="M0.000,0.000 C0.000,0.000 58.000,66.000 150.000,51.000 C150.000,51.000 325.000,1.667 370.000,21.000 L370.000,57.000 L0.000,57.000 "
            />
          </svg>
        </div> */}
        <h3 className="mb-2 text-xl font-semibold tracking-tight transition-colors duration-200 hover:text-primary-background">
          <Link href={`/services/${service.slug}`}>{service.name}</Link>
        </h3>
        <p className="text-sm font-[450] line-clamp-5">{service.description}</p>
        <div className="transition-all duration-300 opacity-0 group-hover:opacity-100">
          <Link
            href={"#"}
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
