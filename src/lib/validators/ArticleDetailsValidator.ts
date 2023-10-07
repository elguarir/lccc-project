import { z } from "zod";

export const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED"]),
  body: z.string(),
  slug: z.string(),
  publishedAt: z.string(),
  categories: z.array(
    z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
      }),
    ),
  ),
  tags: z.array(
    z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
      }),
    ),
  ),
});

// model Article {
//     id          String            @id @default(cuid())
//     title       String
//     description String?
//     body        String?
//     status      ArticleStatus     @default(DRAFT)
//     json        Json
//     slug        String?           @unique
//     publishedAt DateTime?
//     createdAt   DateTime          @default(now())
//     updatedAt   DateTime          @updatedAt
//     authorId    String
//     author      User              @relation(fields: [authorId], references: [id], onDelete: Cascade)
//     comments     Comment[]
//     categories  ArticleCategory[]
//     tags        ArticleTag[]
//     @@index([slug], name: "Article_slug")
//     @@index([authorId], name: "Article_authorId")
//   }

// model Tag {
//     id       String       @id @default(cuid())
//     name     String
//     slug     String       @unique
//     articles ArticleTag[]

//     @@index([slug], name: "Tag_slug")
//   }

//   model Category {
//     id       String            @id @default(cuid())
//     name     String
//     slug     String            @unique
//     articles ArticleCategory[]

//     @@index([slug], name: "Category_slug")
//   }
