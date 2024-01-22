import { formSchema } from "@/lib/validators/UserCreationValidator";
import db from "@/prisma";
import { router, publicProcedure, protectedProcedure } from "@/server/trpc";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = router({
  hello: publicProcedure.query(() => {
    return { hello: "world" };
  }),
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

      let usernameAlreadyExists = await db.user.findUnique({
        where: {
          username: input.username,
        },
      });

      let emailAlreadyExists = await db.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (usernameAlreadyExists)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already exists.",
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
});

export let getUsersList = async () => {
  let users = await clerkClient.users.getUserList();
  let promises = users.map(async (user) => {
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
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.emailAddresses[0].emailAddress,
          avatar: user.imageUrl,
        },
        username: user.username,
        role: dbUser.role,
        createdAt: dbUser.createdAt.toISOString(),
      };
      return formattedUser;
    }
  });

  let formattedUsers = await Promise.all(promises);
  return formattedUsers.filter((user) => user !== undefined);
};
