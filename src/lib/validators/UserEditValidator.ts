import z from "zod";
import { formSchema as schema } from "./UserCreationValidator";

export const formSchema = schema
  .pick({
    firstName: true,
    lastName: true,
    username: true,
  })
  .extend({
    role: z.enum(["user", "admin"]),
  });
