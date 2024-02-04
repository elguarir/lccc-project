import slugIt from "@/lib/helpers/slugify";
import { formSchema } from "@/lib/validators/CategoryCreationValidator";
import db from "@/prisma";
import { router, protectedProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const categoryRouter = router({
  createCategory: protectedProcedure
    .input(formSchema)
    .mutation(async ({ ctx, input }) => {
      let exists = await ctx.prisma.category.findFirst({
        where: {
          slug: slugIt(input.title),
        },
      });
      if (exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Category already exists!",
        });
      }

      let category = await ctx.prisma.category.create({
        data: {
          name: input.title,
          slug: slugIt(input.title),
        },
      });
      return category;
    }),
  getCategories: protectedProcedure.query(async ({ ctx }) => {
    let categories = await getCategoriesWithArticleCount();
    return categories;
  }),
  getCategoryById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      let category = await ctx.prisma.category.findFirst({
        where: {
          id: input.id,
        },
      });
      if (!category) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found!",
        });
      }
      return category;
    }),
  checkSlug: protectedProcedure
    .input(z.object({ slug: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.slug) {
        return undefined;
      }
      let category = await ctx.prisma.category.findFirst({
        where: {
          slug: slugIt(input.slug),
        },
      });

      if (category) {
        let count = 1;
        let newSlug = `${slugIt(input.slug)}-${count}`;
        while (
          await ctx.prisma.category.findFirst({ where: { slug: newSlug } })
        ) {
          count++;
          newSlug = `${input.slug}-${count}`;
        }
        return newSlug;
      }

      return input.slug;
    }),
  updateCategory: protectedProcedure
    .input(formSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let exists = await ctx.prisma.category.findFirst({
        where: {
          id: input.id,
        },
      });
      if (!exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found!",
        });
      }

      let category = await ctx.prisma.category.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.title,
          slug: slugIt(input.title),
        },
      });
      return category;
    }),
  deleteCategory: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let exists = await ctx.prisma.category.findFirst({
        where: {
          id: input.id,
        },
      });
      if (!exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found!",
        });
      }

      let category = await ctx.prisma.category.delete({
        where: {
          id: input.id,
        },
      });
      return category;
    }),
});

export async function getCategoriesWithArticleCount() {
  const categoriesWithCount = await db.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      createdAt: true,
      _count: {
        select: {
          article: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return categoriesWithCount.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    createdAt: category.createdAt,
    articleCount: category._count.article,
  }));
}

export type TCategoryWithArticleCount = Awaited<
  ReturnType<typeof getCategoriesWithArticleCount>
>;
