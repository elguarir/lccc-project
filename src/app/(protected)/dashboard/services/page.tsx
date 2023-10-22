import Header from "@/components/dashboard/services/Header";
import ServicesTable from "@/components/dashboard/services/ServicesTable";
import React from "react";

async function ServicesPage() {
  return (
    <div>
      <Header />
      <div className="w-full pt-4">
        <ServicesTable />
      </div>
    </div>
  );
}

export default ServicesPage;
