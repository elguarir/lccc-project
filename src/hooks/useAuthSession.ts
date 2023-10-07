import { authOptions } from "@/lib/auth";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

export default async function useAuthSession() {
  const session: Session | null = await getServerSession(authOptions);
  return session;
}
