import initialEditorValue from "@/lib/constants/initialEditorValue";
import slugIt from "@/lib/helpers/slugify";
import { FormSchema } from "@/lib/validators/ArticleValidator";
import { FormSchema as DraftFormSchema } from "@/lib/validators/ArticleDetailsValidator";
import db from "@/prisma";
import { router, protectedProcedure } from "@/server/trpc";
import { z } from "zod";

export const articleRouter = router({
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
  getArticleCategories: protectedProcedure.query(async ({ ctx }) => {
    let categories = await ctx.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
    return categories;
  }),
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
  saveDraft: protectedProcedure
    .input(DraftFormSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let article = await ctx.prisma.article.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          slug: input.slug,
          excerpt: input.excerpt,
          main_image: input.coverImage,
          status: "draft",
          publishedAt: input.publishedAt,
          category: {
            connect: {
              id: input.category,
            },
          },
        },
      });
      try {
        await ctx.prisma.articleTag.deleteMany({
          where: {
            articleId: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }

      let tags = (input.tags ?? []).map((tag) => {
        return {
          articleId: input.id,
          tagId: tag.id,
        };
      });

      await ctx.prisma.articleTag.createMany({
        data: tags,
      });

      return article;
    }),

  submitForApproval: protectedProcedure
    .input(FormSchema)
    .mutation(async ({ ctx, input }) => {
      let article = await ctx.prisma.article.update({
        where: {
          id: input.id,
        },
        data: {
          status: "submitted",
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
