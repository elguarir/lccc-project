import React from "react";
import { Button } from "../ui/button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[500px] gap-4">
      <div className="w-full h-full px-4 py-12 rounded-md lg:py-16 lg:px-8 text-foreground">
        <h1 className="text-5xl font-extrabold text-balance md:text-6xl xl:text-7xl font-heading">
          The platform for creative
          <span className="inline-flex ml-2 text-primary">minds</span>.
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
