// import { router, publicProcedure, protectedProcedure } from "@/server/trpc";
// import * as z from "zod";
// import slugify from "slugify";

// export const categoryRouter = router({
//   createCategory: protectedProcedure
//     .input(
//       z.object({
//         name: z.string(),
//       }),
//     )
//     .mutation(async ({ ctx, input }) => {
//       const { name } = input;
//       const { prisma } = ctx;
//       const slug = slugify(name, { lower: true, trim: true });
//       return await prisma.category.upsert({
//         where: { slug },
//         create: { name, slug },
//         update: { name },
//       });
//     }),
//   getCategories: publicProcedure.query(async ({ ctx }) => {
//     const { prisma } = ctx;
//     return await prisma.category.findMany();
//   }),
//   deleteCategory: protectedProcedure
//     .input(
//       z.object({
//         id: z.string(),
//       }),
//     )
//     .mutation(async ({ ctx, input }) => {
//       const { id } = input;
//       const { prisma } = ctx;
//       return await prisma.category.delete({
//         where: { id },
//       });
//     }),

//   hello: publicProcedure.query(() => {
//     return { hello: "world" };
//   }),
// });
