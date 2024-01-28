import { z } from "zod";

export const eventSchema = z.object({
  event: z.object({
    id: z.string(),
    title: z.string(),
    mainImage: z.string(),
  }),
  location: z.string(),
  eventDate: z.date(),
  status: z.enum(["draft", "published"]),
});

export type Event = z.infer<typeof eventSchema>;
