import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

const HeaderSection = () => {
  return (
    <section className="flex flex-col items-center w-full px-2 pb-8 lg:px-6 lg:flex-row lg:gap-12">
      <div className="flex items-center w-full h-full py-8">
        <div className="flex flex-col w-full p-8 py-8 space-y-5 text-neutral-900 max-lg:text-center">
          <h1 className="text-4xl font-black text-dark-foreground md:text-5xl xl:text-6xl 2xl:text-7xl font-home">
            Building Your Vision,{" "}
            <span className="relative z-10 text-primary-background">
              <svg
                className="absolute left-0 -z-[1] h-7 w-full max-w-full -mt-4 top-full"
                viewBox="0 0 220 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M134.66 13.107c-10.334-.37-20.721-.5-31.12-.291l-2.6.06c-4.116.04-8.193.602-12.3.749-14.502.43-29.029 1.196-43.514 2.465-6.414.63-12.808 1.629-19.04 2.866-7.93 1.579-16.113 3.71-23.367 5.003-2.211.374-3.397-1.832-2.31-4.906.5-1.467 1.838-3.456 3.418-4.813a16.047 16.047 0 0 1 6.107-3.365c16.88-4.266 33.763-6.67 51.009-7.389C71.25 3.187 81.81 1.6 92.309.966c11.53-.65 23.097-.938 34.66-.96 7.117-.054 14.25.254 21.36.318l16.194.803 4.62.39c3.85.32 7.693.618 11.53.813 8.346.883 16.673.802 25.144 2.159 1.864.276 3.714.338 5.566.873l.717.225c6.162 1.977 7.92 3.64 7.9 7.197l-.003.203c-.017.875.05 1.772-.112 2.593-.581 2.762-4.066 4.12-8.637 3.63-13.696-1.06-27.935-3.332-42.97-4.168-11.055-.83-22.314-1.459-33.596-1.603l-.022-.332Z"
                  fill="#D1D5DB"
                  fillRule="evenodd"
                />
              </svg>
              Together
            </span>
            .
          </h1>
          <p className="text-sm 2xl:text-base font-[450] max-lg:[text-wrap:balance]  lg:pr-20">
            Discover how your small actions can make a big impact as we work
            together to reduce waste, conserve resources, and protect our planet
            for generations to come.
          </p>
          <div className="flex items-center justify-center w-full gap-1 lg:w-fit">
            <Button
              size={"sm"}
              variant={"outline"}
              className="px-8 rounded-full group text-foreground w-fit"
            >
              <span className="text-sm font-semibold">About Us</span>
              <ChevronRight className="w-4 h-4 ml-0 transition-all duration-300 opacity-0 group-hover:ml-2 group-hover:opacity-100" />
            </Button>
            <Button
              size={"sm"}
              variant={"link"}
              className="px-8 rounded-full border- text-neutral-900 w-fit"
            >
              <span className="text-sm font-semibold ">Contact Us</span>
              {/* <ChevronRight className="w-4 h-4 ml-2" /> */}
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full h-full rounded-sm">
        <div className="flex h-[500px] justify-center mx-auto overflow-hidden w-full items-center space-x-6 lg:space-x-8">
          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
            <div className="h-full overflow-hidden opacity-100 w-44">
              <img
                className="object-cover"
                src="./images/image-1.jpg"
                decoding="async"
                height={926}
                loading="lazy"
                width={428}
              />
            </div>
            <div className="h-full overflow-hidden w-44">
              <img
                className="object-cover"
                src="./images/image-6.jpg"
                decoding="async"
                height={926}
                loading="lazy"
                width={428}
              />
            </div>
          </div>
          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
            <div className="h-full overflow-hidden w-44">
              <img
                className="object-cover"
                src="./images/image-3.jpg"
                decoding="async"
                height={926}
                loading="lazy"
                width={428}
              />
            </div>
            <div className="h-full overflow-hidden w-44">
              <img
                className="object-cover"
                src="./images/image-8.jpg"
                decoding="async"
                height={926}
                loading="lazy"
                width={428}
              />
            </div>
            <div className="h-full overflow-hidden w-44">
              <img
                className="object-cover"
                src="./images/image-3.jpg"
                decoding="async"
                height={926}
                loading="lazy"
                width={428}
              />
            </div>
          </div>
          <div className="flex-shrink-0 hidden grid-cols-1 md:grid gap-y-6 lg:gap-y-8">
            <div className="h-full overflow-hidden w-44">
              <img
                className="object-cover"
                src="./images/image-10.jpg"
                decoding="async"
                height={926}
                loading="lazy"
                width={428}
              />
            </div>
            <div className="h-full overflow-hidden w-44">
              <img
                className="object-cover"
                src="./images/image-4.jpg"
                decoding="async"
                height={926}
                loading="lazy"
                width={428}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
