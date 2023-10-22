import { router, protectedProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcryptjs from "bcryptjs";

export const memberRouter = router({
  getMembers: protectedProcedure.query(async ({ ctx }) => {
    const members = await ctx.prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
      },
    });
    return members;
  }),
  changeRole: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        role: z.enum(["USER", "ADMIN"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        });
      }

      return await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          role: input.role,
        },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          role: true,
        },
      });
    }),
  deleteUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        });
      }

      return await ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(3, "Name must be at least 3 characters long."),
        email: z.string().email("Invalid email address."),
        image: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        });
      }

      return await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          email: input.email,
          image: input.image,
        },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          role: true,
        },
      });
    }),

  createUser: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        image: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (user) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }
      const password = await bcryptjs.hash("12345678", 10);
      return await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: password,
          image: input.image,
          role: "USER",
        },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          role: true,
        },
      });
    }),

  resetPassword: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        });
      }

      const password = await bcryptjs.hash("12345678", 10);
      return await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          password: password,
        },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          role: true,
        },
      });
    }),
});
