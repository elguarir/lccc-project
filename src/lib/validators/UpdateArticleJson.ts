import { z } from "zod";

export const FormSchema = z.object({
  id: z.string(),
  json: z.any(),
});



//   enum ArticleStatus {
//     DRAFT
//     PUBLISHED
//     SCHEDULED
//   }

//   model Article {
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
//     comments    Comment[]
//     categories  ArticleCategory[]
//     tags        ArticleTag[]
//     @@index([slug], name: "Article_slug")
//     @@index([authorId], name: "Article_authorId")
//   }

//   model ArticleTag {
//     articleId String
//     tagId     String
//     article   Article @relation(fields: [articleId], references: [id], onDelete: Cascade)
//     tag       Tag     @relation(fields: [tagId], references: [id], onDelete: Cascade)

//     @@id([articleId, tagId])
//   }

//   model Tag {
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

//   model ArticleCategory {
//     articleId  String
//     categoryId String
//     article    Article   @relation(fields: [articleId], references: [id], onDelete: Cascade)
//     category   Category  @relation(fields: [categoryId], references: [id], onDelete: Cascade)
//     createdAt  DateTime  @default(now())
//     updatedAt  DateTime? @updatedAt

//     @@id([articleId, categoryId])
//   }

//   model Comment {
//     id        String    @id @default(cuid())
//     body      String
//     createdAt DateTime  @default(now())
//     updatedAt DateTime  @updatedAt
//     authorId  String
//     author    User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
//     articleId String
//     article   Article   @relation(fields: [articleId], references: [id], onDelete: Cascade)
//     replies   Comment[] @relation("CommentToComment")
//     Comment   Comment?  @relation(fields: [commentId], references: [id], name: "CommentToComment")
//     commentId String?

//     @@index([authorId], name: "Comment_authorId")
//     @@index([articleId], name: "articleId")
//   }

//   enum Role {
//     ADMIN
//     USER
//   }
