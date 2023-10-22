import { router, protectedProcedure } from "@/server/trpc";
import { schema } from "@/lib/validators/ServiceCreation";
import slugify from "slugify";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const serviceRouter = router({
  getServices: protectedProcedure.query(async ({ ctx }) => {
    const services = await ctx.prisma.service.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        json: true,
        Image: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });
    return services;
  }),

  createService: protectedProcedure
    .input(schema)
    .mutation(async ({ input, ctx }) => {
      const service = await ctx.prisma.service
        .create({
          data: {
            name: input.name,
            description: input.description,
            slug: slugify(input.name, {
              strict: true,
              lower: true,
              trim: true,
            }),
            json: input.json as any,
            Image: input.Image,
            category: {
              connect: {
                id: input.category,
              },
            },
          },
        })
        .catch((err) => {
          if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
              return new TRPCError({
                message: "Service with this title already exists",
                code: "CONFLICT",
              });
            }
          }
        });
      return service;
    }),

  updateService: protectedProcedure
    .input(
      schema.extend({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const service = await ctx.prisma.service.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          slug: slugify(input.name, {
            strict: true,
            lower: true,
            trim: true,
          }),

          json: input.json as any,
          Image: input.Image,
          category: {
            connect: {
              id: input.category,
            },
          },
        },
      });
      return service;
    }),
  deleteService: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const service = await ctx.prisma.service.delete({
        where: {
          id: input.id,
        },
      });
      if (!service) {
        return new TRPCError({
          message: "Service not found!",
          code: "NOT_FOUND",
        });
      }
      return service;
    }),
  getCategories: protectedProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.serviceCategory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return categories;
  }),
  createCategory: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const exists = await ctx.prisma.serviceCategory.findFirst({
        where: {
          slug: slugify(input.name, {
            strict: true,
            lower: true,
            trim: true,
          }),
        },
      });

      if (exists) {
        throw new TRPCError({
          message: "Category with this name already exists",
          code: "CONFLICT",
        });
      }

      const category = await ctx.prisma.serviceCategory.create({
        data: {
          name: input.name,
          slug: slugify(input.name, {
            strict: true,
            lower: true,
            trim: true,
          }),
        },
      });

      return category;
    }),
});
