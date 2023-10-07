import prisma from "@/lib/db";
import { Article, Prisma } from "@prisma/client";

export const UpdateArticle = async (
  data: Article,
  articleId: string,
  userId: string,
) => {
  const res = await prisma.article.update({
    where: {
      id: articleId,
      authorId: userId,
    },
    data: {
      title: data.title,
      slug: data.slug,
      publishedAt: data.publishedAt,
      description: data.description,
      json: data.json as
        | Prisma.NullTypes.JsonNull
        | Prisma.InputJsonValue
        | undefined,

      status: data.status,
    },
  });
  return res;
};
