import initialEditorValue from "@/lib/constants/initialEditorValue";
import slugIt from "@/lib/helpers/slugify";
import db from "@/prisma";
import { router, protectedProcedure } from "@/server/trpc";
import { JsonArray } from "@prisma/client/runtime/library";
import { z } from "zod";

export const articleRouter = router({
  createDraft: protectedProcedure
    .input(z.object({}))
    .mutation(async ({ ctx }) => {
      let aritcle = await ctx.prisma.article.create({
        data: {
          title: "Untitled",
          userId: ctx.user.id,
          content: initialEditorValue,
        },
      });
      return aritcle;
    }),
  createTag: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let existingTag = await ctx.prisma.tag.findFirst({
        where: {
          slug: slugIt(input.name),
        },
      });
      if (existingTag) return existingTag;
      let tag = await ctx.prisma.tag.create({
        data: {
          name: input.name,
          slug: slugIt(input.name),
        },
        select: {
          id: true,
          name: true,
          slug: true,
        },
      });
      return tag;
    }),
  updateContent: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.any(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let article = await ctx.prisma.article.update({
        where: {
          id: input.id,
        },
        data: {
          content: input.content,
        },
      });
      return article;
    }),
});

export async function getArticleById({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  let article = await db.article.findUnique({
    where: {
      id,
      userId,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      status: true,
      approved: true,
      main_image: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!article) return null;

  let formartedArticle = {
    ...article,
    tags: article.tags.map((tag) => tag.tag),
  };

  return formartedArticle;
}

export type TArticleById = Awaited<ReturnType<typeof getArticleById>>;
