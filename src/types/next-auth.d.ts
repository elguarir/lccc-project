import { Role } from "@prisma/client";
import type { User } from "@prisma/client";
import "next-auth/jwt";

declare module "next-auth" {
  interface JWT {
    role: Role;
  }
  interface Session {
    user:
      | {
          name: string;
          email: string | null;
          userId: string;
          image: string | null;
          role: Role;
        }
      | undefined;
  }
}
