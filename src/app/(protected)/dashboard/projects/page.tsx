import Header from "@/components/dashboard/projects/Header";
import ProjectsTable from "@/components/dashboard/projects/ProjectsTable";
import React from "react";

async function ArticlesPage() {

  return (
    <div>
      <Header />
      <div className="w-full pt-4">
        <ProjectsTable />
      </div>
    </div>
  );
}

export default ArticlesPage;
