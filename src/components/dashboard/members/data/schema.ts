import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  user: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    avatar: z.string().url(),
  }),
  username: z.string(),
  role: z.enum(["admin", "user"]),
  createdAt: z.string(),
});

export type User = z.infer<typeof userSchema>;
