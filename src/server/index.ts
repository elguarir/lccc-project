import { articleRouter } from "./routers/article";
import { memberRouter } from "./routers/members";
import { projectRouter } from "./routers/project";
import { serviceRouter } from "./routers/service";
import { tagRouter } from "./routers/tag";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const appRouter = router({
  user: userRouter,
  article: articleRouter,
  project: projectRouter,
  service: serviceRouter,
  member: memberRouter,
  tag: tagRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
