import prisma from "@/lib/db";

export const GetArticleDataById = async (articleId: string, userId: string) => {
  const res = await prisma.article.findUnique({
    where: {
      id: articleId,
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      authorId: true,
      json: true,
      coverImage: true,
      status: true,
      tags: true,
      // categories: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return res;
};
