"use client";
import { getServices } from "@/server/routers/service";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import type { RouterOutput } from "@/types/router";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const ServicesSection = ({
  services,
}: {
  services: RouterOutput["service"]["getServices"];
}) => {
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
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="grid grid-cols-1 gap-6 mx-auto mySwiper lg:px-10 md:grid-cols-2 lg:grid-cols-3"
            breakpoints={{
              950: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              712: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // when window width is < 520px
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
            }}
          >
            {services.map((service) => (
              <SwiperSlide>
                <ServiceCard key={service.id} service={service} />
              </SwiperSlide>
            ))}
          </Swiper>
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
        <h3 className="mb-2 text-xl font-semibold tracking-tight transition-colors duration-200 hover:text-primary-background">
          <Link href={`/services/${service.slug}`}>{service.name}</Link>
        </h3>
        <p className="text-sm font-[450] line-clamp-4">{service.description}</p>
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
