import { z } from "zod";

export const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Required.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Required.",
    })
    .email({
      message: "This isn't a valid email.",
    }),
  password: z
    .string()
    .nonempty({
      message: "Required.",
    })
    .min(6, {
      message: "Must be at least 6 characters long.",
    }),
});
