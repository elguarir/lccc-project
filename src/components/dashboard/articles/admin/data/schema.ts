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
    role: z.enum(["admin", "user"]),
  }),
  category: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional(),
  approved: z.boolean(),
  status: z.enum(["draft", "submitted", "revisions_requested", "published"]),
  publishedAt: z.string().optional(),
});

export type Article = z.infer<typeof articleSchema>;
