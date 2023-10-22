import { router, publicProcedure, protectedProcedure } from "@/server/trpc";
import * as z from "zod";
import slugify from "slugify";

export const tagRouter = router({
  createTag: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name } = input;
      const { prisma } = ctx;
      const slug = slugify(name, {
        strict: true,
        lower: true,
        trim: true,
      });
      return await prisma.tag.upsert({
        where: { slug },
        create: { name, slug },
        update: { name },
      });
    }),
  getTags: publicProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    return await prisma.tag.findMany();
  }),
  deleteTag: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const { prisma } = ctx;
      return await prisma.tag.delete({
        where: { id },
      });
    }),
  hello: publicProcedure.query(() => {
    return { hello: "world" };
  }),
});
