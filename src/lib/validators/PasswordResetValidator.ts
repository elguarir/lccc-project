import { z } from "zod";

export const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Required.",
    })
    .email({
      message: "This isn't a valid email.",
    }),
});
