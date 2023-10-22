import z from "zod";

export const schema = z.object({
  name: z.string().min(3, "Must be at least 3 characters long"),
  description: z.string().min(3, "The description is too short."),
  json: z.any(),
  Image: z.string().nonempty("At least one image is required."),
  category: z.string().nonempty("At least one category is required."),
});

// model Service {
//   id          String            @id @default(cuid())
//   name        String
//   slug        String
//   description String?
//   json        Json
//   Image       String
//   createdAt   DateTime          @default(now())
//   updatedAt   DateTime          @updatedAt
//   categories  ServiceCategory[]
// }

// model ServiceCategory {
//   id        String    @id @default(cuid())
//   name      String
//   slug      String
//   createdAt DateTime  @default(now())
//   updatedAt DateTime? @updatedAt
//   Service   Service?  @relation(fields: [serviceId], references: [id])
//   serviceId String?
// }
