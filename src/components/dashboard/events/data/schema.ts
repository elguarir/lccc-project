import { z } from "zod";

export const articleSchema = z.object({
  id: z.string(), 
  coverImage: z.string().optional().nullable(),
  title: z.string().nullable(),
  status: z.enum(["draft", "submitted", "revisions_requested", "published"]),
  publishedAt: z.string().optional(),
  approved: z.boolean(),
});

export type Article = z.infer<typeof articleSchema>;
