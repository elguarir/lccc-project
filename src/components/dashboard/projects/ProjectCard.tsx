import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { format, formatDistance, subDays } from "date-fns";
import Link from "next/link";
import React from "react";
import { ActionButtons } from "./ActionButtons";
import { Badge } from "@/components/ui/badge";
import { Project } from "@prisma/client";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <li
      key={project.id}
      className="relative flex items-center w-full gap-2 transition-colors duration-200 rounded-sm bg-background hover:bg-muted/80"
    >
      <Link
        className="flex items-center w-full gap-3 px-3 py-3"
        href={`/dashboard/projects/${project.id}/edit`}
      >
        {project.images[0] ? (
          <div className="hidden md:block overflow-hidden min-w-[2.75rem] rounded-[5px]">
            <img
              // aspect video
              className="object-cover  h-11 aspect-video"
              src={project.images[0]}
            />
          </div>
        ) : (
          <div className="overflow-hidden hidden md:flex h-11 aspect-video  items-center justify-center px-2 bg-secondary dark:bg-muted/80 rounded-[5px]">
            <QuestionMarkCircledIcon className="w-4 h-4 text-muted-foreground" />
          </div>
        )}

        <div className="flex flex-col flex-1 gap-0">
          <h3 className="text-sm font-semibold line-clamp-1 md:text-base">
            {project.title || "Untitled"}
          </h3>
          <div className="inline-flex text-xs tracking-wide gap-0.5 max-sm:flex max-sm:flex-col md:text-xs max-w-max text-muted-foreground">
            <div>
              <span className="font-semibold">{project.client}</span>
            </div>
            <div className="hidden sm:block"> – </div>
            <div className="group">
              {project.startDate && (
                <span className="inline-block transition-opacity duration-300">
                  {format(project.startDate, "do MMM yyyy")}
                </span>
              )}
              {project.endDate && (
                <span className="inline-block ml-1 transition-opacity duration-300">
                  - {format(project.endDate, "do MMM yyyy")}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
      <div className="relative">
        <Badge variant={project.status === "PUBLISHED" ? "success" : "outline"}>
          {project.status === "PUBLISHED"
            ? "Published"
            : project.status === "DRAFT"
            ? "Draft"
            : "Private"}
        </Badge>
      </div>
      <div className="pl-2 pr-3">
        <ActionButtons project={project} />
      </div>
    </li>
  );
};

export default ProjectCard;
