import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowUpRight, Clock, ExternalLink, MapPin } from "lucide-react";
import { getEvents } from "@/server/routers/event";
import { CalendarIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

type Props = {};

const EventsSection = async (props: Props) => {
  let events = await getEvents();
  console.log("events", events);
  return (
    <section className="flex flex-col w-full gap-10 py-6 xl:gap-8">
      <div className="relative w-full pl-3 text-left xl:pl-8">
        <svg
          width={22}
          height={30}
          className="absolute block -mt-8 w-fit -ml-7 text-slate-300 dark:text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.07 1.468c-.288-.134-.161-.496.199-1.005.115-.16.583-.483.693-.462.218.039.433.08.612.152.113.04 1.233 1.173 1.62 1.564.385.368.678.795.958 1.234l.841 1.337c.279.446.553.895.814 1.35.089.152.161.312.217.48l.051.17c.177.68.48 1.289.809 1.885l.242.439a.4.4 0 0 0 .179.173c.246.114 1.162 2.064 1.203 2.35.139.698.161 1.445.28 2.146l.028.118a.256.256 0 0 1-.017.196c-.148.296-.038.478.016.685.078.288.145.58.181.883.019.152-.036.331-.064.5-.028.156-.318.209-.367.18-.139-.081-.222.072-.327.133l-.08.043a.206.206 0 0 1-.037.013c-.045.004-1.215-1.096-1.449-1.349l-.032-.037-.77-1.069c-.43-.514-.737-1.116-.83-1.223-.088-.12-.091-.277-.116-.424-.01-.075-1.069-1.706-1.103-1.772-.151-.371-.426-.678-.377-1.151.01-.092-.039-.159-.078-.228-.34-.595-.563-1.25-.826-1.887-.134-.325-.333-.613-.494-.923-.03-.056-.028-.129-.044-.193l-.04-.159a.39.39 0 0 0-.032-.074c-.426-.706-.726-1.492-1.247-2.138-.112-.153-.366-1.07-.52-1.233-.079-.093.024-.652-.093-.704ZM.414 27.098c-.28.091-.397-.262-.414-.873-.006-.196.156-.74.244-.802.172-.117.342-.228.5-.3.098-.038 1.44.005 1.902-.03.446-.021.872.039 1.293.12.859.154 1.728.267 2.596.387.193.027.379.085.562.168.55.26 1.13.358 1.714.417l.386.037a.315.315 0 0 0 .21-.055c.199-.133 2.005.124 2.23.231.561.244 1.11.605 1.677.856.08.04.172.028.236.148.147.276.331.271.509.328.248.077.494.165.737.28.12.059.228.198.341.307.1.1.006.379-.037.407-.124.08-.048.23-.052.353a.583.583 0 0 1-.012.127c-.015.043-1.373.511-1.681.59l-.047.01-1.166.121c-.596.104-1.197.054-1.324.074-.13.013-.25-.07-.374-.124l-1.882-.043c-.352-.077-.728-.03-1.042-.341-.062-.06-.137-.061-.207-.069-.62-.073-1.214-.283-1.813-.465-.305-.092-.623-.129-.934-.196-.056-.012-.104-.059-.158-.086l-.132-.073a.27.27 0 0 0-.07-.023c-.74-.137-1.447-.433-2.202-.517-.175-.017-.911-.496-1.112-.512-.114-.008-.366-.487-.478-.451Z"
            fillRule="evenodd"
            fill="currentColor"
          />
        </svg>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-[1.6rem] sm:text-3xl xl:text-4xl font-extrabold tracking-[-0.01em] font-heading">
            Latest Events
          </h2>
          <Button
            asChild
            size={"sm"}
            variant={"secondary"}
            className="px-3 max-sm:h-9 sm:px-4"
          >
            <Link href="/events">
              View All
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-6 py-12">
        {events.slice(0, 4).map((evt) => (
          <EventCard
            key={evt.id}
            id={evt.id}
            title={evt.title}
            slug={evt.slug}
            excerpt={evt.excerpt}
            description={evt.description}
            mainImage={evt.mainImage}
            eventDate={evt.eventDate}
            location={evt.location}
          />
        ))}
      </div>
    </section>
  );
};

export default EventsSection;

interface EventCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage: string;
  eventDate: Date;
  location: string;
  description: any;
}

export const EventCard = (props: EventCardProps) => {
  return (
    <div className="flex flex-col items-center w-full gap-10 xl:flex-row">
      <div className="@container flex items-center w-full h-full gap-2.5 xl:gap-4 xl:w-[40%]">
        <div className="hidden sm:flex max-sm:@lg:flex flex-col items-center justify-start h-full text-4xl font-semibold select-none">
          {format(new Date(props.eventDate), "d")}
          <span className="-mt-1.5 text-sm font-[550] text-muted-foreground">
            {format(new Date(props.eventDate), "MMM")}
          </span>
        </div>
        <div className="flex items-start flex-1 h-full overflow-hidden rounded-md aspect-video">
          <img
            className="object-cover w-full h-full"
            src={props.mainImage}
            alt={props.title}
          />
        </div>
      </div>
      <div className="flex flex-col justify-start w-full h-full xl:w-[60%]">
        <Link
          href={`/events/${props.slug}`}
          className="text-5xl font-semibold leading-normal tracking-tight transition-colors duration-300 hover:text-primary line-clamp-2"
        >
          {props.title}
        </Link>
        <p className="text-lg font-medium leading-snug text-muted-foreground line-clamp-3">
          {props.excerpt}
        </p>
        <div className="flex flex-col gap-1 mt-6">
          <div className="flex items-center ml-1 text-lg font-bold tracking-wide uppercase">
            <h3>Event Details</h3>
          </div>
          <div className="flex flex-wrap items-center gap-5 xl:gap-10">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span className="text-lg font-medium text-muted-foreground">
                {props.location}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <span className="text-lg font-medium text-muted-foreground">
                {/* OCT 10, 2022 */}
                {format(new Date(props.eventDate), "MMM d, y")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-lg font-medium text-muted-foreground">
                {format(new Date(props.eventDate), "h:mm a")}
              </span>
            </div>

            <div className="ml-auto">
              <Button asChild size={"sm"} variant={"outline"}>
                <Link href={`/events/${props.slug}`}>
                  Learn More
                  <ExternalLinkIcon className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
