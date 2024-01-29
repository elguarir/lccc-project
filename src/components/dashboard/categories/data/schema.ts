import { z } from "zod";

export const categorySchema = z.object({
  category: z.object({
    id: z.string(),
    title: z.string(),
  }),
  slug: z.string(),
  articleCount: z.number(),
  createdAt: z.date(),
});

export type Category = z.infer<typeof categorySchema>;
