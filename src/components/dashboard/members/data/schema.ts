import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  username: z.string(),
  role: z.string(),
  createdAt: z.string(),
});

export type User = z.infer<typeof userSchema>;
