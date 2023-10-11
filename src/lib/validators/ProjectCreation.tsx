import z from "zod";

export const schema = z.object({
  title: z
    .string()
    .min(3, {
      message: "The title is too short, it must be at least 3 characters long!",
    })
    .max(50, {
      message:
        "The title is too long, it must be less than 50 characters long!",
    }),
  description: z
    .string()
    .min(3, {
      message:
        "The description is too short, it must be at least 3 characters long!",
    })
    .max(1000, {
      message:
        "The description is too long, it must be less than 1000 characters long!",
    }),
  client: z.string().nonempty({
    message: "The client field is required!",
  }),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  images: z.array(z.string()).nonempty({
    message: "The images field is required!",
  }),
  json: z.any(),
});

// model ProjectCategory {
//     projectId  String
//     categoryId String
//     name       String
//     slug       String
//     project    Project   @relation(fields: [projectId], references: [id], onDelete: Cascade)
//     category   Category  @relation(fields: [categoryId], references: [id], onDelete: Cascade)
//     createdAt  DateTime  @default(now())
//     updatedAt  DateTime? @updatedAt

//     @@id([projectId, categoryId])
//   }
// model Project {
//     id              String            @id @default(cuid())
//     title           String
//     slug            String
//     description     String?
//     status          Status            @default(DRAFT)
//     images          String[]
//     client          String?
//     json            Json
//     startDate       DateTime?
//     endDate         DateTime?
//     createdAt       DateTime          @default(now())
//     updatedAt       DateTime          @updatedAt
//     ProjectCategory ProjectCategory[]
//   }
