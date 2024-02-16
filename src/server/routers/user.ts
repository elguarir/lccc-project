import { formSchema } from "@/lib/validators/UserCreationValidator";
import { formSchema as userEditSchema } from "@/lib/validators/UserEditValidator";
import db from "@/prisma";
import { router, protectedProcedure } from "@/server/trpc";
import { auth, clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const userRouter = router({
  currentUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
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
  getUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform view this resource.",
        });
      }

      let user = await clerkClient.users.getUser(input.id);
      let dbUser = await db.user.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!dbUser || !user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User does not exist.",
        });
      }

      let res = {
        firstName: user.firstName!,
        lastName: user.lastName!,
        email: dbUser.email,
        username: user.username!,
        avatar: dbUser.avatar_url!,
        role: dbUser.role as "admin" | "user",
      };
      return res;
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

      revalidateTag("user-details");
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

type getUserProps = {
  id?: string;
  username?: string;
};
export type TgetUser = Awaited<ReturnType<typeof getUser>>;
export let getUser = async ({ id, username }: getUserProps) => {
  let user = null;
  if (username && !id) {
    user = db.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        avatar_url: true,
        role: true,
        createdAt: true,
        profile: {
          select: {
            bio: true,
            facebook: true,
            twitter: true,
            instagram: true,
            github: true,
            website: true,
          },
        },
        username: true,
      },
    });
  }

  if (id && !username) {
    user = await db.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        avatar_url: true,
        role: true,
        createdAt: true,
        profile: {
          select: {
            bio: true,
            facebook: true,
            twitter: true,
            instagram: true,
            github: true,
            website: true,
          },
        },
        username: true,
      },
    });
  }
  return user;
};
