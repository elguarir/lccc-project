import Header from "@/components/dashboard/members/Header";
import MembersTable from "@/components/dashboard/members/MembersTable";
import React from "react";

async function ArticlesPage() {

  return (
    <div>
      <Header />
      <div className="w-full pt-4">
        <MembersTable />
      </div>
    </div>
  );
}

export default ArticlesPage;
