import ProjectsDetailsForm from "@/components/dashboard/projects/ProjectsDetailsForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
type Props = {
  params: {
    id: string;
  };
};

const ProjectEditPage = async (props: Props) => {
  const { id } = props.params;

  const project = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });
  console.log(project)
  if (!project) redirect("/dashboard/projects");
  return (
    <div className="flex flex-col md:container">
      <Button
        asChild
        variant={"ghost"}
        className="self-start -ml-2 text-xs md:-ml-4 w-fit"
        size={"sm"}
      >
        <Link href={"/dashboard/projects"}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </Button>
      <div className="w-full py-4 border-b border-transparent">
        <header className="relative grid w-full">
          <h2 className="text-2xl font-[550] md:font-bold font-display">
            Edit Project Details
          </h2>
          <p className="mt-1 text-sm font-medium xl:mt-2 text-muted-foreground">
            Edit project details and click save to update.
          </p>
        </header>
      </div>
      <main className="py-4">
        <ProjectsDetailsForm project={project} />
      </main>
    </div>
  );
};

export default ProjectEditPage;
