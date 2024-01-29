import { articleRouter } from "./routers/article";
import { categoryRouter } from "./routers/category";
import { eventRouter } from "./routers/event";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const appRouter = router({
  user: userRouter,
  article: articleRouter,
  event: eventRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
