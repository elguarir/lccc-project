import { BlockRenderer } from "@/components/editor/BlockRenderer";
import { Separator } from "@/components/ui/separator";
import { getEventBySlug } from "@/server/routers/event";
import { OutputData } from "@editorjs/editorjs";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { MapPin } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const revalidate = 3600;

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug;
  const event = await getEventBySlug(slug);
  const previousImages = (await parent).openGraph?.images || [];

  if (!event) {
    return {
      title: "Event not found",
      openGraph: {
        images: previousImages,
      },
    };
  }
  return {
    title: event.title,
    description: event.excerpt,
    openGraph: {
      images: [event.mainImage!, ...previousImages],
    },
  };
}
const EventPage = async (props: Props) => {
  let event = await getEventBySlug(props.params.slug);

  if (!event) {
    return notFound();
  }

  return (
    <main className="flex flex-col w-full gap-6 py-16 md:max-w-6xl md:mx-auto lg:py-24">
      <div className="flex flex-col pb-8 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
          {event.title}
        </h1>
        <img
          src={event?.mainImage ?? ""}
          className="object-cover w-full rounded-md shadow aspect-video"
          alt={event?.title ?? "Cover image"}
        />
      </div>
      <div className="grid grid-cols-1 gap-16 xl:grid-cols-12">
        <div className="prose w-full col-span-1 xl:col-span-8 max-w-full prose-base marker:text-muted-foreground text-foreground dark:prose-code:bg-gray-600/80 prose-code:bg-gray-200/80 prose-a:text-foreground prose-a:transition-colors hover:prose-a:text-primary prose-code:rounded-[2px] prose-code:px-px prose-code:py-px prose-code:font-mono prose-neutral dark:prose-invert prose-p:!mt-0 prose-p:!mb-3">
          <h1>About the event</h1>
          {(event?.description as OutputData | null)?.blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
        <div className="flex-col hidden col-span-1 gap-3 font-mono font-[550] text-xl xl:col-span-4 xl:flex">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5" />
            <span>{format(new Date(event.eventDate), "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-3">
            <ClockIcon className="w-5 h-5" />
            <span>{format(new Date(event.eventDate), "h:mm aaaa")}</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventPage;
