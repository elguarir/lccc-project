import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { format, formatDistance, subDays } from "date-fns";
import Link from "next/link";
import React from "react";
import { ActionButtons } from "./ActionButtons";
import { Service } from "@prisma/client";
import { RouterOutput } from "@/types/router";
type Props = {
  service: RouterOutput["service"]["getServices"][0];
};

const ServiceCard = ({ service }: Props) => {
  return (
    <li
      key={service.id}
      className="relative flex items-center w-full gap-2 transition-colors duration-200 rounded-sm bg-background hover:bg-muted/80"
    >
      <Link
        className="flex items-center w-full gap-3 px-3 py-3"
        href={`/dashboard/services/${service.id}/edit`}
      >
        {service.Image ? (
          <div className="hidden md:block overflow-hidden min-w-[2.75rem] rounded-[5px]">
            <img
              // aspect video
              className="object-cover h-11 aspect-video"
              src={service.Image}
            />
          </div>
        ) : (
          <div className="overflow-hidden hidden md:flex h-11 aspect-video  items-center justify-center px-2 bg-secondary dark:bg-muted/80 rounded-[5px]">
            <QuestionMarkCircledIcon className="w-4 h-4 text-muted-foreground" />
          </div>
        )}

        <div className="flex flex-col flex-1 gap-0">
          <h3 className="text-sm font-semibold line-clamp-1 md:text-base">
            {service.name || "Untitled"}
          </h3>
          <div className="inline-flex text-xs tracking-wide gap-0.5 max-sm:flex max-sm:flex-col md:text-xs max-w-max text-muted-foreground">
            <div>
              <span className="font-semibold">{service.category.name}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="relative px-4 text-xs font-medium md:text-sm min-w-fit">
        <div>
          Published on {" "}
          <span className="block lg:inline-block">
          {format(new Date(service.createdAt), "dd MMM yyyy")}  
          </span>
        </div>
      </div>
      <div className="pl-2 pr-3">
        <ActionButtons service={service} />
      </div>
    </li>
  );
};

export default ServiceCard;
