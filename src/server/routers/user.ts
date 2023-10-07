import { router, publicProcedure, protectedProcedure } from "@/server/trpc";
import { FormSchema as signUpFormSchema } from "@/lib/validators/SignUpValidator";
import { FormSchema as PasswordResetFormSchema } from "@/lib/validators/PasswordResetValidator";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { renderEmail } from "@/emails/PasswordResetEmail";
import { sendEmail } from "@/lib/sendEmail";
import { siteConfig } from "@/config/site";

export const userRouter = router({
  signUp: publicProcedure
    .input(signUpFormSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email already exists.",
          cause: "Email already exists.",
        });
      }
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const newUser = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          emailVerified: true,
          image: true,
        },
      });
      return {
        success: true,
        user: newUser,
      };
    }),
  sendPasswordResetEmail: publicProcedure
    .input(PasswordResetFormSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
        select: {
          name: true,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email does not exist.",
          cause: "Email does not exist.",
        });
      }
      const fullName = user.name ?? "there";
      const emailHtml = await renderEmail({
        fullName,
        resetPasswordLink: "https://este.elguarir.dev",
      });
      const res = await sendEmail({
        to: input.email,
        html: emailHtml,
        subject: `Password Reset Request: ${siteConfig.name}`,
      });
      if (!res.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send email.",
          cause: "Failed to send email.",
        });
      }

      return {
        success: true,
        message: "Email sent successfully.",
      };
     
    }),
  hello: publicProcedure.query(() => {
    return { hello: "world" };
  }),
});
