import db from "@/prisma";
import { protectedProcedure, publicProcedure, router } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const commentsRouter = router({
  getComments: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await getComments({ id: input.id });
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
          article: {
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
  editComment: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
        body: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const comment = await ctx.prisma.comment.update({
        where: {
          id: input.commentId,
        },
        data: {
          body: input.body,
          edited: true,
        },
      });

      return comment;
    }),
  updateComment: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
        body: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const comment = await ctx.prisma.comment.update({
        where: {
          id: input.commentId,
        },
        data: {
          body: input.body,
          edited: true,
        },
      });
      return comment;
    }),
  deleteComment: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let existingComment = await ctx.prisma.comment.findUnique({
        where: {
          id: input.commentId,
        },
        select: {
          userId: true,
          children: {
            select: {
              id: true,
            },
          },
        },
      });

      if (existingComment?.userId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to delete this comment",
        });
      }

      // Delete likes associated with the comment
      await ctx.prisma.like.deleteMany({
        where: {
          commentId: input.commentId,
        },
      });

      if (existingComment?.children.length) {
        await ctx.prisma.comment.deleteMany({
          where: {
            parentId: input.commentId,
          },
        });
      }

      const comment = await ctx.prisma.comment.delete({
        where: {
          id: input.commentId,
        },
      });

      return comment;
    }),
  likeComment: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.user;
      if (!user) {
        throw new Error("Not authenticated");
      }

      const comment = await ctx.prisma.comment.findUnique({
        where: {
          id: input.commentId,
        },
        select: {
          likes: {
            where: {
              userId: user.id,
            },
          },
        },
      });

      if (comment?.likes.length) {
        await ctx.prisma.like.deleteMany({
          where: {
            commentId: input.commentId,
            userId: user.id,
          },
        });
      } else {
        await ctx.prisma.like.create({
          data: {
            commentId: input.commentId,
            userId: user.id,
          },
        });
      }

      return await ctx.prisma.comment.findUnique({
        where: {
          id: input.commentId,
        },
        select: {
          likes: {
            select: {
              userId: true,
            },
          },
        },
      });
    }),
});

export type TGetComments = Awaited<ReturnType<typeof getComments>>;
export async function getComments({ id }: { id: string }) {
  let comments = await db.article.findFirst({
    where: {
      id,
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
              likes: {
                select: {
                  id: true,
                  commentId: true,
                  userId: true,
                },
              },
            },
          },
          likes: {
            select: {
              id: true,
              commentId: true,
              userId: true,
            },
          },
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  let formattedComments = (comments?.comments ?? [])
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map((comment) => ({
      id: comment.id,
      body: comment.body,
      edited: comment.edited,
      user: {
        id: comment.user.id,
        first_name: comment.user.first_name,
        last_name: comment.user.last_name,
        username: comment.user.username,
        avatar: comment.user.avatar_url,
      },
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      replies: comment.children
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .map((reply) => ({
          id: reply.id,
          body: reply.body,
          edited: reply.edited,
          user: {
            id: reply.user.id,
            first_name: reply.user.first_name,
            last_name: reply.user.last_name,
            username: reply.user.username,
            avatar: reply.user.avatar_url,
          },
          // likesCount: reply.likes.length,
          likedBy: reply.likes.map((like) => like.userId),
          createdAt: reply.createdAt,
          updatedAt: reply.updatedAt,
        })),
      likesCount: comment.likes.length,
      likedBy: comment.likes.map((like) => like.userId),
    }));

  return {
    comments: formattedComments,
    count: comments?._count.comments ?? 0,
  };
}
