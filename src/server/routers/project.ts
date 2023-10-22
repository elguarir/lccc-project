import { router, protectedProcedure } from "@/server/trpc";
import { schema } from "@/lib/validators/ProjectCreation";
import slugify from "slugify";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
export const projectRouter = router({
  getProjects: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  createProject: protectedProcedure
    .input(schema)
    .mutation(async ({ input, ctx }) => {
      const project = await ctx.prisma.project
        .create({
          data: {
            title: input.title,
            description: input.description,
            slug: slugify(input.title, {
              strict: true,
              lower: true,
              trim: true,
            }),
            status: "DRAFT",
            client: input.client,
            json: input.json as any,
            images: input.images,
            startDate: input.startDate,
            endDate: input.endDate,
          },
        })
        .catch((err) => {
          if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
              return new TRPCError({
                message: "Project with this title already exists",
                code: "CONFLICT",
              });
            }
          }
        });
      return project;
    }),
  createCategory: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const category = await ctx.prisma.projectCategory
        .create({
          data: {
            name: input.name,
            slug: slugify(input.name, {
              strict: true,
              lower: true,
              trim: true,
            }),
          },
        })
        .catch((err) => {
          if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
              return new TRPCError({
                message: "Category with this title already exists",
                code: "CONFLICT",
              });
            }
          }
        });
      return category;
    }),
  updateProject: protectedProcedure
    .input(
      schema.extend({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const project = await ctx.prisma.project.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          slug: slugify(input.title, {
            strict: true,
            lower: true,
            trim: true,
          }),
          status: input.status,
          client: input.client,
          json: input.json as any,
          images: input.images,
          startDate: input.startDate,
          endDate: input.endDate,
        },
      });
      return project;
    }),
  deleteProject: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const project = await ctx.prisma.project.delete({
        where: {
          id: input.id,
        },
      });
      if (!project) {
        return new TRPCError({
          message: "Project not found!",
          code: "NOT_FOUND",
        });
      }
      return project;
    }),
});
