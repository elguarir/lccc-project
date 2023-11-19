import { TRPCError, initTRPC } from "@trpc/server";
// import useAuthSession from "@/hooks/useAuthSession";
import prisma from "@/lib/db";
import superjson from 'superjson';

const t = initTRPC.context().create({
  transformer: superjson,

});


const isAuthed = t.middleware(async ({ ctx, next }) => {
  // const session = await useAuthSession();
  // if (!session?.user) {
  //   throw new TRPCError({
  //     code: "UNAUTHORIZED",
  //   });
  // }
  return next({
    ctx: {
      ...ctx,
      // user: session.user,
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
    }
  })
})


export const protectedProcedure = t.procedure.use(isAuthed);
