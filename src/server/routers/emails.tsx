import { protectedProcedure, router } from "@/server/trpc";
import { z } from "zod";
import { Resend } from "resend";
import { env } from "@/lib/env/server";
import { fromEmail } from "@/emails/constants";
import { WelcomeEmail } from "@/emails/templates/Welcome";
console.log(env.RESEND_API_KEY);
const resend = new Resend(env.RESEND_API_KEY);

export const emailRouter = router({
  sendWelcomeEmail: protectedProcedure
    .input(z.object({ email: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await sendWelcomeEmail({ ...input });
      } catch (error) {
        console.log(error);
      }
      return { success: true };
    }),
});

type props = {
  email: string;
  name: string;
};

export async function sendWelcomeEmail({ email, name }: props) {
  await resend.emails.send({
    from: `LCC Club<${fromEmail}>`,
    to: email,
    subject: "Welcome to Language, Communication, Creativity Club!",
    react: <WelcomeEmail name={name} email={email} />,
    text: "Welcome to Language, Communication, Creativity Club!",
  });
}
