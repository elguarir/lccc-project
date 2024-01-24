import { formSchema } from "@/lib/validators/UserCreationValidator";
import { formSchema as userEditSchema } from "@/lib/validators/UserEditValidator";
import db from "@/prisma";
import { router, protectedProcedure } from "@/server/trpc";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const userRouter = router({
  getUsersList: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to perform view this resource.",
      });
    }
    try {
      let users = await getUsersList();
      return users;
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while fetching users.",
      });
    }
  }),
  deleteUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform view this resource.",
        });
      }

      let user = await clerkClient.users.deleteUser(input.id);
      return user;
    }),
  createUser: protectedProcedure
    .input(formSchema)
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform view this resource.",
        });
      }

      let emailAlreadyExists = await db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (emailAlreadyExists)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "An account with this email already exists.",
        });

      try {
        let user = await clerkClient.users.createUser({
          firstName: input.firstName,
          lastName: input.lastName,
          emailAddress: [input.email],
          username: input.username,
          password: input.password,
        });

        return user;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          // @ts-ignore
          message: error?.errors[0]?.message,
        });
      }
    }),

  updateUserRole: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        role: z.enum(["admin", "user"]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform view this resource.",
        });
      }

      let user = await db.user.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!user)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User does not exist.",
        });

      let updatedUser = await db.user.update({
        where: {
          id: input.id,
        },
        data: {
          role: input.role,
        },
      });

      return updatedUser;
    }),
  updateUser: protectedProcedure
    .input(
      userEditSchema.extend({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform view this resource.",
        });
      }

      let user = await db.user.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!user)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User does not exist.",
        });
      let updatedUser;
      try {
        updatedUser = await clerkClient.users.updateUser(input.id, {
          firstName: input.firstName,
          lastName: input.lastName,
          username: input.username,
        });
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          // @ts-ignore
          message: error?.errors[0]?.message,
        });
      }

      await db.user.update({
        where: {
          id: input.id,
        },
        data: {
          role: input.role,
        },
      });

      revalidatePath(`/dashboard/members/${input.id}`)
      return updatedUser;
    }),
});

export let getUsersList = async () => {
  let users = await clerkClient.users.getUserList();
  let formattedUsers = [];

  for (let user of users) {
    let formattedUser;
    let dbUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (dbUser) {
      formattedUser = {
        id: user.id,
        user: {
          firstName: user.firstName!,
          lastName: user.lastName!,
          email: user.emailAddresses[0].emailAddress,
          avatar: user.imageUrl,
        },
        username: user.username!,
        role: dbUser.role as "admin" | "user",
        createdAt: dbUser.createdAt.toISOString(),
      };
      formattedUsers.push(formattedUser);
    }
  }

  return formattedUsers.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};
