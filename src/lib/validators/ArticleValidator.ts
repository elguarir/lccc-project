import { z } from "zod";

export const FormSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, "The title is too short.")
    .max(255, "The title is too long."),
  slug: z.string(),
  coverImage: z.string().url(),
  excerpt: z
    .string()
    .min(3, "The excerpt is too short.")
    .max(255, "The excerpt is too long."),
  publishedAt: z.date(),
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
    }),
  ),
});
