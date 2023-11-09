import { Button } from "@/components/ui/button";
import PlateRender from "@/lib/serialize";
import { getServiceBySlug } from "@/server/routers/service";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return notFound();
  }

  return (
    <div className="relative">
      <div className="container relative flex py-10 mb-4">
        <div className="flex flex-col items-center justify-center w-full gap-2 py-16">
          <h1 className="text-3xl font-bold text-dark-foreground md:text-5xl">
            {service.name}
          </h1>
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
            <Link
              className="transition-colors duration-200 hover:text-primary-background"
              href={"/"}
            >
              SOMACEP
            </Link>{" "}
            •{" "}
            <Link
              className="transition-colors duration-200 hover:text-primary-background"
              href={"/services"}
            >
              Services
            </Link>
            •
            <Link
              className="transition-colors duration-200 hover:text-primary-background"
              href={"/services/" + service.slug}
            >
              {service.name}
            </Link>
          </div>
        </div>
      </div>
      <div className="container grid gap-4">
        <div className="flex justify-center w-full">
          <img
            src={service.Image}
            className="h-[60vh] object-cover rounded-md aspect-auto"
            alt={service.name}
          />
        </div>
        <div className="flex flex-col justify-center px-2 py-12 pb-2 justify-left">
          <div className="flex items-center gap-2 text-xs font-semibold whitespace-nowrap">
            <span className="w-[20px] h-[2.7px] rounded-base font-bold bg-primary-background" />
            SOMACEP
          </div>
          <h1 className="text-2xl font-bold text-dark-foreground md:text-3xl xl:text-4xl">
            {service.name}
          </h1>
          <div className="flex items-center gap-2"></div>
        </div>
        <div
          style={{
            backgroundImage: "url('/images/bg-services.png')",
          }}
          className="object-cover w-full py-4 font-medium bg-right bg-no-repeat"
        >
          <PlateRender value={service.json as any} />
        </div>

        <div className="flex flex-col items-center justify-center gap-6 mt-10">
          <h3 className="text-xl font-bold text-center">
            What are you waiting for? <br /> Give us a call!
          </h3>
          <Button
            asChild
            className="flex items-center gap-2 px-8 space-y-0 text-lg font-semibold uppercase"
            size={"lg"}
          >
            <Link href={"tel:0628975515"}>
              <Phone className="w-5 h-5" />
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
