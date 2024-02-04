import slugIt from "@/lib/helpers/slugify";
import { formSchema } from "@/lib/validators/EventCreationValidator";
import { router, protectedProcedure } from "@/server/trpc";
import { z } from "zod";

export const eventRouter = router({
  createEvent: protectedProcedure
    .input(formSchema)
    .mutation(async ({ ctx, input }) => {
      let event = await ctx.prisma.event.create({
        data: {
          title: input.title,
          slug: slugIt(input.title),
          excerpt: input.excerpt,
          mainImage: input.mainImage,
          description: input.description,
          location: input.location,
          eventDate: input.eventDate,
          status: input.status,
        },
      });
      return event;
    }),
  checkSlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.slug) {
        return "";
      }
      let event = await ctx.prisma.event.findFirst({
        where: {
          slug: input.slug,
        },
      });

      if (event) {
        let count = 1;
        let newSlug = `${input.slug}-${count}`;
        while (await ctx.prisma.event.findFirst({ where: { slug: newSlug } })) {
          count++;
          newSlug = `${input.slug}-${count}`;
        }
        return newSlug;
      }

      return input.slug;
    }),
  updateEvent: protectedProcedure
    .input(formSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let event = await ctx.prisma.event.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          slug: slugIt(input.title),
          excerpt: input.excerpt,
          mainImage: input.mainImage,
          description: input.description,
          location: input.location,
          eventDate: input.eventDate,
          status: input.status,
        },
      });
      return event;
    }),
  getEvents: protectedProcedure.query(async ({ ctx }) => {
    let events = await ctx.prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return events;
  }),
  updateEventStatus: protectedProcedure
    .input(formSchema.pick({ status: true }).extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let event = await ctx.prisma.event.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });
      return event;
    }),
  deleteEvent: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let event = await ctx.prisma.event.delete({
        where: {
          id: input.id,
        },
      });
      return event;
    }),
});
