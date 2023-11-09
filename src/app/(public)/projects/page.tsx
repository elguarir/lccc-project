import { Button } from "@/components/ui/button";
import { getProjects } from "@/server/routers/project";
import { RouterOutput } from "@/types/router";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const page = async () => {
  const projects = await getProjects();

  return (
    <div className="py-8 lg:py-20">
      <div className="container space-y-2">
        <h1 className="text-xl font-bold lg:text-3xl xl:text-5xl">
          Our Recent Projects
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
            href={"/projects"}
          >
            Projects
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
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;

interface ProjectCardProps {
  project: RouterOutput["project"]["getProjects"][0];
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="relative w-full h-auto overflow-hidden rounded-sm group aspect-square">
      {/* on hover */}
      <div className="absolute opacity-0 bg-neutral-100 border text-neutral-700 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300 inset-0 z-[4] w-full h-full">
        <div className="grid w-full h-full p-6 py-14 place-items-center">
          <div className="space-y-3">
            <h3 className="w-full relative text-xl font-[650] hover:text-primary duration-300 after:content-[''] after:absolute after:top-[6px] after:-left-[8px] after:h-[17px] after:w-[3px] after:bg-primary">
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </h3>
            <p className="text-sm font-medium text-neutral-600 line-clamp-4">
              {project.description}
            </p>
            <div className="py-4">
              <Button asChild>
                <Link
                  className="flex items-center gap-1 px-8 space-y-0 font-semibold uppercase hover:gap-2"
                  href={`/projects/${project.slug}`}
                >
                  Details
                  <DoubleArrowRightIcon className="w-4 h-4" strokeWidth={3.5} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* normal state */}
      <div className="absolute group-hover:opacity-0 transition-all duration-300 inset-0 z-[3] w-full h-full ">
        <div className="grid w-full h-full p-6 py-8 place-items-end">
          <h3 className="w-full relative text-xl font-[650] hover:text-primary duration-300 after:content-[''] after:absolute after:top-[6px] after:-left-[8px] after:h-[17px] after:w-[3px] text-neutral-100 after:bg-primary">
            <Link href={`/projects/${project.slug}`}>{project.title}</Link>
          </h3>
        </div>
      </div>
      <div className="w-full absolute bg-black/50 z-[2] inset-0 h-full" />
      <img src={project.images[0]} className="object-cover w-full h-full" />
    </div>
  );
};
