import { router, protectedProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { schema as passwordChangeSchema } from "@/lib/validators/PasswordChangeValidator";
import { schema } from "@/lib/validators/MemberCreation";

export const memberRouter = router({
  getMembers: protectedProcedure.query(async ({ ctx }) => {
    const members = await ctx.prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        createdAt: true,
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
    .input(schema.extend({ id: z.string() }))
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
          bio: input.bio,
          role: input.role,
          contact: input.contact,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          bio: true,
          contact: true,
        },
      });
    }),

  createUser: protectedProcedure
    .input(schema)
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
      const password = await bcryptjs.hash("123456", 10);
      return await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: password,
          image: input.image,
          role: input.role,
          bio: input.bio,
          contact: input.contact,
        },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          role: true,
          bio: true,
          contact: true,
        },
      });
    }),

  resetPassword: protectedProcedure
    .input(passwordChangeSchema.extend({ id: z.string() }))
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

      const password = await bcryptjs.hash(input.password, 10);
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
