import React from "react";
import { Button } from "../ui/button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full grid py-12 lg:py-16 grid-cols-1 md:grid-cols-2 min-h-[500px] gap-4">
      <div className="w-full h-full rounded-md lg:px-8 text-foreground lg:pt-6">
        {/* title and description */}
        <div>
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
            Discover a platform where language, culture, and creativity
            intersect. Engage in thought-provoking discussions and share your
            unique perspective with the community.
          </p>
        </div>

        {/* buttons */}
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

        <div className="flex items-center gap-6 mt-12 md:mt-16">
          <Stat title="Members" value={"30+"} />
          <Separator />
          <Stat title="Articles" value={"25+"} />
          <Separator />
          <Stat title="Events" value={5} />
        </div>
      </div>
      <div className="w-full rounded-md">
        <img src={"/images/hero-image.png"} className="object-contain h-[580px] w-full lg:-mt-8" alt="hero image" />
      </div>
    </section>
  );
};

export default HeroSection;

let Stat = ({ title, value }: { title: string; value: string | number }) => {
  return (
    <div className="flex flex-col -space-y-1">
      <div className="text-xl font-extrabold lg:text-2xl font-heading">{value}</div>
      <div className="text-sm text-muted-foreground font-[450]">{title}</div>
    </div>
  );
};

let Separator = () => {
  return (
    <svg
      className="text-slate-300 dark:text-gray-600"
      width={14}
      height={10}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.039 0c.099.006 1.237.621 1.649.787.391.17.735.41 1.067.667.682.515 1.387.995 2.089 1.48.102.071.196.153.284.245l.497-.172 1.76-.342.13-.097a.402.402 0 0 1 .206-.09l.107-.012c.218-.035.677-.132 1.143-.122l1.11-.062c.16-.001 1.67.295 1.691.339a.639.639 0 0 1 .026.129c.018.125-.035.29.09.352.045.022.167.292.084.41l-.137.203a.726.726 0 0 1-.147.164 5.18 5.18 0 0 1-.658.404l-.182.089a.534.534 0 0 0-.257.327c-.046.133-.134.134-.204.189-.376.26-.736.581-1.102.868L11 5.965l.219.284.55.784c.093.129.187.255.286.375.052.073.137.1.147.242.022.324.182.399.314.529.184.179.363.368.528.581.081.107.123.285.179.437.049.138-.138.362-.186.37-.137.023-.128.197-.178.312a.618.618 0 0 1-.058.116c-.03.034-1.375-.105-1.67-.162l-.09-.028-1.004-.368c-.552-.157-1.05-.462-1.167-.498-.117-.043-.19-.173-.275-.278l-1.604-.847c-.138-.113-.294-.199-.433-.311l-.162.083-.174.068c-.8.26-1.602.514-2.39.808-.385.15-.778.278-1.198.327-.439.038-1.692.294-1.788.271a3.114 3.114 0 0 1-.505-.227c-.09-.049-.306-.58-.324-.78-.056-.628.013-1.007.285-.96.11.02.29-.51.395-.536.06-.016.165-.088.287-.182l.334-.266c.157-.126.297-.234.363-.252.697-.205 1.325-.62 2.004-.878l.063-.035.07-.057-.01-.013a.425.425 0 0 0-.094-.115c-.586-.448-1.082-1.031-1.7-1.434-.058-.036-.165-.181-.284-.349L1.55 2.72c-.12-.168-.233-.316-.3-.356-.095-.056-.131-.619-.24-.632C.734 1.696.765 1.31.982.725 1.05.537 1.396.09 1.495.07c.192-.037.38-.07.544-.07Z"
        fillRule="evenodd"
        fill="currentColor"
      />
    </svg>
  );
};
