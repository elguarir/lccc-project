import { articleRouter } from "./routers/article";
import { categoryRouter } from "./routers/category";
import { tagRouter } from "./routers/tag";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const appRouter = router({
  user: userRouter,
  article: articleRouter,
  category: categoryRouter,
  tag: tagRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
