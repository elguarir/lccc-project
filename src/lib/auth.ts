import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/db";
import type { NextAuthOptions } from "next-auth";
import { env } from "./env/server";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req,
      ) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) return null;
        const isValid = await bcrypt.compare(password, user.password as string);
        if (!isValid) return null;
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          userId: token.sub,
          name: token.name,
          role: token.role,
          email: token.email,
          image: token.picture,
        },
      };
    },
    async jwt({ token, trigger, session, user }) {
      if (trigger === "update" && session?.name) {
        token.name = session?.name;
        token.picture = session?.image;
      } else {
        const dbUser = await prisma.user.findFirst({
          where: { email: token.email },
        });
        if (!dbUser) {
          token.sub = user!.id;
        }
        token.sub = dbUser?.id;
        token.role = dbUser?.role;
      }
      return token;
    },
  },
};
