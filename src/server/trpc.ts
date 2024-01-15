import { TRPCError, initTRPC } from "@trpc/server";
// import useAuthSession from "@/hooks/useAuthSession";
import prisma from "@/prisma";
import superjson from "superjson";
import { currentUser } from "@clerk/nextjs";

const t = initTRPC.context().create({
  transformer: superjson,
});

const isAuthed = t.middleware(async ({ ctx, next }) => {
  const user = await currentUser();
  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to do this.",
    });
  }
  const dbuser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      profile: true,
    },
  });
  if (!dbuser) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to do this.",
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: {
        id: user.id,
        username: dbuser.username,
        email: dbuser.email,
        role: dbuser.role,
        profile: dbuser.profile,
      },
      prisma,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure.use((opts) => {
  return opts.next({
    ctx: {
      ...opts.ctx,
      prisma,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
