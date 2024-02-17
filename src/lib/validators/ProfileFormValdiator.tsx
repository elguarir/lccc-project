import { z } from "zod";

export let formSchema = z.object({
  bio: z.string().max(255, "The bio is too long.").optional(),
  twitter: z.string().max(255, "The twitter username is too long.").optional(),
  facebook: z
    .string()
    .max(255, "The facebook username is too long.")
    .optional(),
  instagram: z
    .string()
    .max(255, "The instagram username is too long.")
    .optional(),
  github: z.string().max(255, "The github username is too long.").optional(),
  website: z
    .string()
    .regex(
      new RegExp(
        `^((https?|ftp|smtp)://)?(www.)?[a-z0-9]+.[a-z]+(/[a-zA-Z0-9#]+/?)*$`,
      ),
      "The website url is invalid.",
    )
    .max(255, "The website url is too long.")
    .optional(),
});
