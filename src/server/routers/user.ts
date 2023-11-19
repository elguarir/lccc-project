import { router, publicProcedure, protectedProcedure } from "@/server/trpc";

export const userRouter = router({
  hello: publicProcedure.query(() => {
    return { hello: "world" };
  }),
});
