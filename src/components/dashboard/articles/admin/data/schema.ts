import { z } from "zod";

export const articleSchema = z.object({
  article: z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    coverImage: z.string().nullable(),
  }),
  author: z.object({
    id: z.string(),
    username: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    avatar: z.string(),
  }),
  category: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional(),
  publishedAt: z.string(),
});

export type Article = z.infer<typeof articleSchema>;
