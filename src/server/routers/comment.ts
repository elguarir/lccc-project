import db from "@/prisma";
import { protectedProcedure, router } from "@/server/trpc";
import { z } from "zod";

export const commentsRouter = router({
  getComments: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await getComments(input);
    }),

  createComment: protectedProcedure
    .input(
      z.object({
        articleId: z.string(),
        body: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.user;
      if (!user) {
        throw new Error("Not authenticated");
      }

      const comment = await db.comment.create({
        data: {
          body: input.body,
          user: {
            connect: {
              id: user.id,
            },
          },
          Article: {
            connect: {
              id: input.articleId,
            },
          },
        },
      });

      return comment;
    }),
  replyToComment: protectedProcedure
    .input(
      z.object({
        articleId: z.string(),
        parentId: z.string(),
        body: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const newReply = await ctx.prisma.comment.create({
        data: {
          body: input.body,
          userId: ctx.user.id,
          articleId: input.articleId,
          parentId: input.parentId,
        },
      });
      return newReply;
    }),
});

export type TGetComments = Awaited<ReturnType<typeof getComments>>;
async function getComments({ slug }: { slug: string }) {
  let comments = await db.article.findFirst({
    where: {
      slug,
    },
    select: {
      comments: {
        select: {
          id: true,
          body: true,
          edited: true,
          createdAt: true,
          updatedAt: true,

          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              username: true,
              avatar_url: true,
            },
          },
          children: {
            select: {
              id: true,
              body: true,
              edited: true,
              createdAt: true,
              updatedAt: true,
              user: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  username: true,
                  avatar_url: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return (comments?.comments ?? []).map((comment) => ({
    id: comment.id,
    body: comment.body,
    edited: comment.edited,
    user: {
      id: comment.user.id,
      name: `${comment.user.first_name} ${comment.user.last_name}`,
      username: comment.user.username,
      avatar: comment.user.avatar_url,
    },
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    replies: comment.children.map((reply) => ({
      id: reply.id,
      body: reply.body,
      edited: reply.edited,
      user: {
        id: reply.user.id,
        name: `${reply.user.first_name} ${reply.user.last_name}`,
        username: reply.user.username,
        avatar: reply.user.avatar_url,
      },
      createdAt: reply.createdAt,
      updatedAt: reply.updatedAt,
    })),
  }));
}
