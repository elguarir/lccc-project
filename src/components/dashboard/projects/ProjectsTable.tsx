"use client";
import { UserArticlesType } from "@/types/article";
import React, { useCallback, useEffect } from "react";
import { trpc } from "@/server/client";
import { Skeleton } from "../../ui/skeleton";
import { useSearchParams } from "next/navigation";
import ProjectCard from "./ProjectCard";

type Props = {
  articles?: UserArticlesType;
};

const ProjectsTable = ({}: Props) => {
  const { data: projects, isLoading } = trpc.project.getProjects.useQuery();

  if (isLoading) {
    return (
      <ul className="table w-full p-2 space-y-1 border-[1.35px] border-dashed rounded-lg border-muted-foreground/20">
        {[0, 1, 2, 4, 5, 6].map((_, idx) => (
          <Skeleton key={idx} className="w-full h-16" />
        ))}
      </ul>
    );
  }

  return (
    <ul className="table w-full overflow-hidden border-[1.35px] border-dashed divide-y rounded-lg divide-dashed">
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ul>
  );
};

export default ProjectsTable;
