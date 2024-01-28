import slugIt from "@/lib/helpers/slugify";
import { formSchema } from "@/lib/validators/EventCreationValidator";
import { router, protectedProcedure } from "@/server/trpc";

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
    getEvents: protectedProcedure
      .query(async ({ ctx }) => {
        let events = await ctx.prisma.event.findMany();
        return events;
      })
});
