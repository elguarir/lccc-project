import z from "zod";
// member schema
export const schema = z.object({
  name: z.string().nonempty("The name is required.").nullable(),
  email: z
    .string()
    .nonempty("The email is required.")
    .email("Must be a valid email address"),
  password: z.string().min(8, "Must be at least 8 characters long").optional(),
  role: z.enum(["ADMIN", "USER"]).optional().default("USER"),
  image: z.string().optional(),
  bio: z.string().optional(),
  contact: z.string().optional(),
});
