import { router, protectedProcedure } from "@/server/trpc";
import { schema } from "@/lib/validators/ProjectCreation";
import slugify from "slugify";
export const projectRouter = router({
  projects: protectedProcedure.query(async ({ ctx }) => {
    const projects = await ctx.prisma.project.findMany();
    return projects;
  }),

  createProject: protectedProcedure
    .input(schema)
    .mutation(async ({ input, ctx }) => {
      const project = await ctx.prisma.project.create({
        data: {
          title: input.title,
          description: input.description,
          slug: slugify(input.title),
          status: "DRAFT",
          json: input.json as any,
          images: input.images,
          startDate: input.startDate,
          endDate: input.endDate,
        },
      });
      return project;
    }),
});
