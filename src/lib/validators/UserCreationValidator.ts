import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  username: z.string().min(1, { message: "Username is required." }),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  role: z.enum(["admin", "user"]),
});
