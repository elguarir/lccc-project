import { getProjects } from "@/server/routers/project";
import { RouterOutput } from "@/types/router";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";

const ProjectsSection = async () => {
  const projects = await getProjects();
  return (
    <section className="object-cover py-24">
      <div className="container">
        <div className="relative w-full gap-6 px-5 text-neutral-600">
          <div className="grid w-full gap-3 -mt-10 [text-wrap:balance] lg:max-w-prose mx-auto">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold whitespace-nowrap">
              <span className="w-[20px] h-[2.7px] rounded-sm bg-primary-background" />
              OUR PROJECTS
            </div>
            <h2 className="text-3xl text-center lg:text-4xl font-[700] lg:font-[800] leading-8 lg:leading-10 [text-wrap:balance] ">
              Explore Our Latest Projects And Recent Works
            </h2>
          </div>
          <div className="absolute items-center hidden gap-4 -left-10 lg:flex">
            <span className="text-2xl font-medium tracking-normal -rotate-12 font-hand">Our latest Projects</span>
            <svg
              viewBox="0 0 85 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 relative top-2 -left-1 rotate-[230deg]"
            >
              <path
                d="M84.1428 1.12604C68.4579 15.0432 48.2728 24.8484 26.7076 22.7737C20.393 22.1662 13.251 19.5041 7.51 16.6647C6.29685 16.0646 5.19832 15.2656 4.08583 14.4969C3.06981 13.7949 4.95423 22.296 5.12047 23.2959C6.89794 33.9863 5.2443 22.4385 4.04146 18.4653C3.10796 15.3818 1.13626 12.2911 0.701068 9.07517C0.350636 6.4856 5.49948 7.02736 7.26614 6.8582C9.08258 6.68426 20.8214 3.77937 19.2507 7.81152C16.4328 15.0458 10.9147 19.889 6.01223 25.5572"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div className="mt-28">
          <div className="grid gap-8 mx-auto lg:px-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

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
