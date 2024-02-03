import React from "react";
import { Button } from "../ui/button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[500px] gap-4">
      <div className="w-full h-full px-4 py-12 rounded-md lg:py-16 lg:px-8 text-foreground">
        <h1 className="text-5xl font-extrabold text-balance z-[1] md:text-6xl xl:text-7xl font-heading">
          The platform for creative
          <span className="relative inline-flex ml-2 text-primary">
            minds
            <svg
              className="absolute text-slate-300 dark:text-gray-600  top-[100%] w-full left-0 max-w-full -mt-4"
              width={220}
              height={24}
              viewBox="0 0 220 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M134.66 13.107c-10.334-.37-20.721-.5-31.12-.291l-2.6.06c-4.116.04-8.193.602-12.3.749-14.502.43-29.029 1.196-43.514 2.465-6.414.63-12.808 1.629-19.04 2.866-7.93 1.579-16.113 3.71-23.367 5.003-2.211.374-3.397-1.832-2.31-4.906.5-1.467 1.838-3.456 3.418-4.813a16.047 16.047 0 0 1 6.107-3.365c16.88-4.266 33.763-6.67 51.009-7.389C71.25 3.187 81.81 1.6 92.309.966c11.53-.65 23.097-.938 34.66-.96 7.117-.054 14.25.254 21.36.318l16.194.803 4.62.39c3.85.32 7.693.618 11.53.813 8.346.883 16.673.802 25.144 2.159 1.864.276 3.714.338 5.566.873l.717.225c6.162 1.977 7.92 3.64 7.9 7.197l-.003.203c-.017.875.05 1.772-.112 2.593-.581 2.762-4.066 4.12-8.637 3.63-13.696-1.06-27.935-3.332-42.97-4.168-11.055-.83-22.314-1.459-33.596-1.603l-.022-.332Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </span>
          .
        </h1>
        <p className="w-full mt-2 text-sm font-medium text-balance md:text-base text-muted-foreground max-w-prose">
          Discover a platform where language, culture, and creativity intersect.
          Engage in thought-provoking discussions and share your unique
          perspective with the community.
        </p>
        <div className="flex items-center gap-2 mt-6">
          <Button
            asChild
            className="items-center px-4 rounded-full md:px-7 h-9"
          >
            <Link href={"/sign-up"}>Join The Community</Link>
          </Button>
          <Button
            asChild
            variant={"ghost"}
            className="items-center px-4 rounded-full group md:px-7 h-9"
          >
            <Link href={"/about"}>
              Learn More
              <ExternalLinkIcon className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="w-full h-full rounded-md bg-gray-50"></div>
    </div>
  );
};

export default HeroSection;
