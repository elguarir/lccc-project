import ServicesDetailsForm from "@/components/dashboard/services/ServicesDetailsForm";
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

const ServiceEditPage = async (props: Props) => {
  const { id } = props.params;

  const service = await prisma.service.findUnique({
    where: {
      id: id,
    },
  });
  console.log(service)
  if (!service) redirect("/dashboard/services");
  return (
    <div className="flex flex-col md:container">
      <Button
        asChild
        variant={"ghost"}
        className="self-start -ml-2 text-xs md:-ml-4 w-fit"
        size={"sm"}
      >
        <Link href={"/dashboard/services"}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </Button>
      <div className="w-full py-4 border-b border-transparent">
        <header className="relative grid w-full">
          <h2 className="text-2xl font-[550] md:font-bold font-display">
            Edit Service Details
          </h2>
          <p className="mt-1 text-sm font-medium xl:mt-2 text-muted-foreground">
            Edit service details and click save to update.
          </p>
        </header>
      </div>
      <main className="py-4">
        <ServicesDetailsForm service={service} />
      </main>
    </div>
  );
};

export default ServiceEditPage;
