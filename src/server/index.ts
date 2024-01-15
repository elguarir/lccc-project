import { articleRouter } from "./routers/article";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const appRouter = router({
  user: userRouter,
  article: articleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
