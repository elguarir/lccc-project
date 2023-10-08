import initialEditorValue from "@/lib/constants/initialEditorValue";
import { GetUserArticles } from "@/lib/helpers/GetUserArticles";
("@/lib/constants/initialEditorValue");
import { FormSchema as DraftArticleValidator } from "@/lib/validators/DraftArticleValidator";
import { router, publicProcedure, protectedProcedure } from "@/server/trpc";
import { z } from "zod";
export const articleRouter = router({
  userArticles: protectedProcedure.query(async ({ ctx }) => {
    const data = await GetUserArticles(ctx.user.userId);
    return data;
  }),
  details: protectedProcedure
    .input(z.object({ articleId: z.string() }))
    .query(async ({ input, ctx }) => {
      const data = await ctx.prisma.article.findUnique({
        where: { id: input.articleId },
        include: {
          tags: true,
          categories: true,
        },
      });
      return data;
    }),
  draftArticle: protectedProcedure
    .input(DraftArticleValidator)
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx;
      const { title, description } = input;
      const res = await ctx.prisma.article.create({
        data: {
          title,
          description,
          json: initialEditorValue,
          authorId: user.userId,
        },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          status: true,
          json: true,
          coverImage: true,
          publishedAt: true,
          authorId: true,
          categories: true,
          tags: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return res;
    }),
  changeStatus: protectedProcedure
    .input(
      z.object({
        articleId: z.string(),
        status: z.optional(z.enum(["DRAFT", "PUBLISHED"])),
        publishedAt: z.optional(z.date()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.prisma.article.update({
        where: { id: input.articleId, authorId: ctx.user.userId },
        data: { status: input.status, publishedAt: input.publishedAt },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          authorId: true,
          json: true,
          coverImage: true,
          status: true,
          tags: true,
          categories: true,
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return { success: true, article: data };
    }),
  duplicateArticle: protectedProcedure
    .input(z.object({ articleId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const existingArticle = await ctx.prisma.article.findUnique({
        where: { id: input.articleId },
        include: {
          tags: true,
          categories: true,
        },
      });

      if (!existingArticle) {
        throw new Error("Article not found");
      }

      // Step 2: Clone the article with a new ID and set its status to "DRAFT"
      const clonedArticle = await ctx.prisma.article.create({
        data: {
          title: existingArticle.title + " (Duplicated)",
          description: existingArticle.description,
          body: existingArticle.body,
          status: "DRAFT",
          json: existingArticle.json as any,
          coverImage: existingArticle.coverImage,
          slug:
            existingArticle.slug === null
              ? null
              : existingArticle.slug + "-duplicated",
          authorId: existingArticle.authorId,
          tags: {
            connect: existingArticle.tags.map((tag) => ({ tagId: tag.tagId })),
          },
          categories: {
            connect: existingArticle.categories.map((category) => ({
              categoryId: category.categoryId,
            })),
          },
        },
      });

      return { success: true, article: clonedArticle };
    }),
  deleteArticle: protectedProcedure
    .input(z.object({ articleId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.prisma.article.delete({
        where: { id: input.articleId, authorId: ctx.user.userId },
      });
      return { success: true, article: res };
    }),

  updateArticleDetails: protectedProcedure
    .input(
      z.object({
        articleId: z.string(),
        title: z.optional(z.string()),
        slug: z.optional(z.string()),
        description: z.optional(z.nullable(z.string())),
        publishedAt: z.optional(z.date().nullable()),
        coverImage: z.optional(z.nullable(z.string())),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.prisma.article.update({
        where: { id: input.articleId, authorId: ctx.user.userId },
        data: {
          title: input.title,
          slug: input.slug,
          description: input.description,
          coverImage: input.coverImage,
          publishedAt: input.publishedAt,
        },
      });
      return {
        success: true,
        article: res,
      };
    }),
  hello: publicProcedure.query(() => {
    return { hello: "world" };
  }),
});
