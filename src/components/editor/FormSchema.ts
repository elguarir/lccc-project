import { z } from "zod";

export const FormSchema = z.object({
  title: z
    .string()
    .min(3, "The title is too short.")
    .max(255, "The title is too long."),
  slug: z.string(),
  coverImage: z.string().url().optional(),
  excerpt: z
    .string()
    .min(3, "The excerpt is too short.")
    .max(255, "The excerpt is too long."),
  publishedAt: z.date().optional(),
  tags: z.array(z.string()).optional(),
});
