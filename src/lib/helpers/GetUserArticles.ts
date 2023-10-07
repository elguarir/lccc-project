import prisma from "@/lib/db";

export const GetUserArticles = async (userId: string | undefined) => {
  if (!userId) throw new Error("User id is not defined");
  const res = await prisma.article.findMany({
    where: {
      authorId: userId,
    },
    include: {
      tags: true,
      author: {
        select: {
          name: true,
          email: true,
          id: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    }
  });
  return res;
};
