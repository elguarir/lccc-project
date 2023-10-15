import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

const HeaderSection = () => {
  return (
    <section className="flex flex-col items-center w-full px-2 pb-8 lg:px-6 lg:flex-row lg:gap-12">
      <div className="flex items-center w-full h-full py-8">
        <div className="flex flex-col w-full p-8 py-8 space-y-5 text-white max-lg:text-center">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl xl:text-6xl 2xl:text-7xl font-display">
            Building Your Vision, Together.
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
              className="px-8 text-white rounded-full w-fit"
            >
              <span className="text-sm font-semibold ">Contact Us</span>
              {/* <ChevronRight className="w-4 h-4 ml-2" /> */}
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full h-full rounded-sm">
        <div className="relative grid justify-center pr-[10px] gap-10 items-center  w-full [grid-template-rows:_auto_auto] [grid-template-columns:_1fr_1fr] [grid-auto-columns:_1fr]">
          <img
            className="relative object-cover rounded-md z-[2] -rotate-6 scale-[80%] translate-x-8 translate-y-3 brightness-90 self-end slide-in-from-top-11 w-4/5  antialiased h-[210px]"
            src="https://images.pexels.com/photos/7245333/pexels-photo-7245333.jpeg?cs=srgb&dl=pexels-olga-lioncat-7245333.jpg&fm=jpg&w=1920&h=1281&_gl=1*ld32c7*_ga*ODQ4NjQ0ODM2LjE2OTczOTMzNjA.*_ga_8JE65Q40S6*MTY5NzM5MzM2MS4xLjEuMTY5NzM5MzM3OC4wLjAuMA.."
          />
          <img
            className="relative object-cover rounded-md z-[2] brightness-90 self-end slide-in-from-top-11 w-4/5 antialiased  h-[210px] scale-90 rotate-[5deg] -translate-x-8 translate-y-3"
            src="https://images.pexels.com/photos/7244373/pexels-photo-7244373.jpeg?cs=srgb&dl=pexels-olga-lioncat-7244373.jpg&fm=jpg&w=1920&h=1281&_gl=1*vz9cww*_ga*ODQ4NjQ0ODM2LjE2OTczOTMzNjA.*_ga_8JE65Q40S6*MTY5NzM5MzM2MS4xLjEuMTY5NzM5MzQwNC4wLjAuMA.."
          />
          <img
            className="relative object-cover scale-[80%] -rotate-6 translate-x-8 -translate-y-5 rounded-md z-[2] brightness-90 self-end slide-in-from-top-11 w-5/6 h-[210px]"
            src="https://images.pexels.com/photos/4876018/pexels-photo-4876018.jpeg?cs=srgb&dl=pexels-ion-ceban-ionelceban-4876018.jpg&fm=jpg&w=1920&h=1281&_gl=1*1yjdeqo*_ga*ODQ4NjQ0ODM2LjE2OTczOTMzNjA.*_ga_8JE65Q40S6*MTY5NzM5MzM2MS4xLjEuMTY5NzM5MzQyMC4wLjAuMA.."
          />
          <img
            className="relative rotate-6 -translate-x-4 object-cover rounded-md z-[2] brightness-90 self-end slide-in-from-top-11 w-4/5 antialiased  h-[210px]"
            src="https://images.pexels.com/photos/7078501/pexels-photo-7078501.jpeg?cs=srgb&dl=pexels-laura-tancredi-7078501.jpg&fm=jpg&w=1920&h=1281&_gl=1*18ewgs0*_ga*ODQ4NjQ0ODM2LjE2OTczOTMzNjA.*_ga_8JE65Q40S6*MTY5NzM5MzM2MS4xLjEuMTY5NzM5MzQ0Mi4wLjAuMA.."
          />
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
