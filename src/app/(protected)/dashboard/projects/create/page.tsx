import ProjectCreationForm from "@/components/dashboard/projects/ProjectsCreationForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProjectCreate = () => {
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
            Project Details
          </h2>
          <p className="mt-1 text-sm font-medium xl:mt-2 text-muted-foreground">
            Fill in the details of your project. You can always edit them later.
          </p>
        </header>
      </div>
      <main className="py-4">
        <ProjectCreationForm />
      </main>
    </div>
  );
};

export default ProjectCreate;
