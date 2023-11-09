"use client";
import React from "react";
// Import Swiper and SwiperSlide components
import { Swiper, SwiperSlide } from "swiper/react";
// Import swiper styles
import "swiper/css";
import "swiper/css/pagination";

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
        {/* Add Swiper component here */}
        <Swiper
          className="!pt-10"
          loop={true} // Enable infinite loop
          slidesPerView={4}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            520: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            950: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {/* Wrap client logos inside SwiperSlide components */}
          <SwiperSlide className="!flex w-full justify-center items-center">
            <div className="!w-32 h-28 flex items-center transition-all duration-300 cursor-pointer grayscale hover:grayscale-0 hover:scale-90">
              <img src="/images/maroc_telecom.png" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="!flex w-full justify-center items-center">
            <div className="!w-32 h-28 flex items-center transition-all duration-300 cursor-pointer grayscale hover:grayscale-0 hover:scale-90">
              <img src="/images/ram_logo.png" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="!flex w-full justify-center items-center">
            <div className="!w-32 h-28 flex items-center transition-all duration-300 cursor-pointer grayscale hover:grayscale-0 hover:scale-90">
              <img src="/images/Picture2.png" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="!flex w-full justify-center items-center">
            <div className="!w-32 h-28 flex items-center transition-all duration-300 cursor-pointer grayscale hover:grayscale-0 hover:scale-90">
              <img src="/images/fenie.png" alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default ClientsSection;
