import { z } from "zod";

export const FormSchema = z.object({
  title: z.optional(z.string()).default("Untitled"),
  description: z.optional(z.string()),
});
