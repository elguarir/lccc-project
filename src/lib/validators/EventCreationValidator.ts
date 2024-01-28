import z from "zod"

export const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    excerpt: z.string().min(1, "Description is required"),
    mainImage: z.string().url("An image is required"),
    description: z.any(),
    location: z.string().min(1, "Location is required"),
    eventDate: z.date(),
    status: z.enum(["draft", "published"]).default("draft"),
  });