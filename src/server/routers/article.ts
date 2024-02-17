import initialEditorValue from "@/lib/constants/initialEditorValue";
import slugIt from "@/lib/helpers/slugify";
import { FormSchema as DraftFormSchema } from "@/lib/validators/ArticleDetailsValidator";
import db from "@/prisma";
import { router, protectedProcedure } from "@/server/trpc";
import { z } from "zod";
import { JsonArray } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { useCurrentUser } from "@/hooks/use-current-user";

export const articleRouter = router({
  createTag: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let existingTag = await ctx.prisma.tag.findFirst({
        where: {
          slug: slugIt(input.name),
        },
      });
      if (existingTag) return existingTag;
      let tag = await ctx.prisma.tag.create({
        data: {
          name: input.name,
          slug: slugIt(input.name),
        },
        select: {
          id: true,
          name: true,
          slug: true,
        },
      });
      return tag;
    }),
  getArticleCategories: protectedProcedure.query(async ({ ctx }) => {
    let categories = await ctx.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
    return categories;
  }),
  createDraft: protectedProcedure
    .input(z.object({}))
    .mutation(async ({ ctx }) => {
      let aritcle = await ctx.prisma.article.create({
        data: {
          title: "Untitled",
          userId: ctx.user.id,
          content: initialEditorValue,
        },
      });
      return aritcle;
    }),
  checkSlug: protectedProcedure
    .input(z.object({ slug: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.slug) {
        return undefined;
      }
      let article = await ctx.prisma.article.findFirst({
        where: {
          slug: input.slug,
        },
      });

      if (article) {
        let count = 1;
        let newSlug = `${input.slug}-${count}`;
        while (
          await ctx.prisma.article.findFirst({ where: { slug: newSlug } })
        ) {
          count++;
          newSlug = `${input.slug}-${count}`;
        }
        return newSlug;
      }

      return input.slug;
    }),
  updateContent: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.any(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let article = await ctx.prisma.article.update({
        where: {
          id: input.id,
        },
        data: {
          content: input.content,
        },
      });
      return article;
    }),
  approveArticle: protectedProcedure
    .input(z.object({ id: z.string(), notify: z.boolean().optional() }))
    .mutation(async ({ ctx, input }) => {
      let article = await ctx.prisma.article.update({
        where: {
          id: input.id,
        },
        data: {
          approved: true,
          status: "published",
        },
      });
      return article;
    }),
  changeArticleStatus: protectedProcedure
    .input(
      z.object({ id: z.string(), action: z.enum(["publish", "unpublish"]) }),
    )
    .mutation(async ({ ctx, input }) => {
      let article = await ctx.prisma.article.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          author: {
            select: {
              role: true,
              id: true,
            },
          },
          status: true,
          approved: true,
        },
      });
      if (!article)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "This article does not exists!",
        });
      if (input.action === "publish") {
        await ctx.prisma.article.update({
          where: {
            id: input.id,
          },
          data: {
            approved: true,
            status: "published",
          },
        });
      } else {
        await ctx.prisma.article.update({
          where: {
            id: input.id,
          },
          data: {
            approved: article.author.role === "admin" ? true : false,
            status: "draft",
          },
        });
      }
    }),
  saveDraft: protectedProcedure
    .input(DraftFormSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let article = await ctx.prisma.article.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          slug: input.slug,
          excerpt: input.excerpt,
          main_image: input.coverImage,
          status: "draft",
          publishedAt: input.publishedAt,
          category: input.category ? { connect: { id: input.category } } : {},
        },
      });
      try {
        await ctx.prisma.articleTag.deleteMany({
          where: {
            articleId: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }

      let tags = (input.tags ?? []).map((tag) => {
        return {
          articleId: input.id,
          tagId: tag.id,
        };
      });

      await ctx.prisma.articleTag.createMany({
        data: tags,
      });

      return article;
    }),
  getSumbittedArticlesCount: protectedProcedure.query(async ({ ctx }) => {
    let articles = await getSubmittedArticlesCount();
    return articles;
  }),
  getUsersArticlesCount: protectedProcedure.query(async ({ ctx }) => {
    let articlesCount = await getUsersArticlesCount();
    return articlesCount;
  }),
  submitForApproval: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let article = await ctx.prisma.article.update({
        where: {
          id: input.id,
        },
        data: {
          status: "submitted",
        },
      });
      return article;
    }),
  getArticleById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      let article = await ctx.prisma.article.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          userId: true,
          title: true,
          slug: true,
          excerpt: true,
          content: true,
          status: true,
          approved: true,
          main_image: true,
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          tags: {
            select: {
              tag: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!article) return null;

      let formartedArticle = {
        ...article,
        tags: article.tags.map((tag) => tag.tag),
      };
      return formartedArticle;
    }),
  getUserArticles: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      let articles = await getUserArticles({ userId: input.userId });
      return articles;
    }),
  getUsersArticles: protectedProcedure.query(async ({ ctx }) => {
    let articles = await getUsersArticles();
    return articles;
  }),
  getSumbittedArticles: protectedProcedure.query(async ({ ctx }) => {
    let articles = await getSubmittedArticles();
    return articles;
  }),
  duplicateArticle: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let article = await db.article.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          userId: true,
          title: true,
          slug: true,
          excerpt: true,
          content: true,
          status: true,
          approved: true,
          main_image: true,
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          tags: {
            select: {
              tag: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!article)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Article not found",
        });
      let newArticle = await ctx.prisma.article.create({
        data: {
          title: article.title + " (duplicated)",
          slug: article.slug + "-duplicated",
          excerpt: article.excerpt,
          content: article.content as JsonArray,
          status: "draft",
          userId: article.userId,
          main_image: article.main_image,
        },
      });

      return newArticle;
    }),
  deleteArticle: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let article = await ctx.prisma.article.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
      return article;
    }),
  getArticleRevisions: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      let revisions = await ctx.prisma.revision.findMany({
        where: {
          articleId: input.id,
        },
      });
      return revisions;
    }),
});

// get user's articles by id
export type TUserArticles = Awaited<ReturnType<typeof getUserArticles>>;
export async function getUserArticles({ userId }: { userId: string }) {
  let articles = await db.article.findMany({
    where: {
      userId,
      deletedAt: null,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      status: true,
      approved: true,
      main_image: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return articles;
}

// get all articles
export type TUsersArticles = Awaited<ReturnType<typeof getUsersArticles>>;
export async function getUsersArticles() {
  let user = await useCurrentUser();
  if (!user) return [];

  let articles = await db.article.findMany({
    where: {
      deletedAt: null,
      OR: [
        { status: "submitted" || "published" || "revisions_requested" },
        {
          approved: true,
        },
      ],
      NOT: {
        userId: user?.id,
      },
    },
    select: {
      id: true,
      userId: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      status: true,
      approved: true,
      main_image: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      author: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar_url: true,
          username: true,
          role: true,
        },
      },
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  let formartedArticles = articles.map((article) => {
    return {
      ...article,
      tags: article.tags.map((tag) => tag.tag),
    };
  });

  return formartedArticles;
}

// get article by id
export type TArticleById = Awaited<ReturnType<typeof getArticleById>>;
export async function getArticleById({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  let article = await db.article.findUnique({
    where: {
      id,
      userId,
      deletedAt: null,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      status: true,
      approved: true,
      main_image: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!article) return null;

  let formartedArticle = {
    ...article,
    tags: article.tags.map((tag) => tag.tag),
  };

  return formartedArticle;
}

// get only submitted articles
export type TSubmittedArticles = Awaited<
  ReturnType<typeof getSubmittedArticles>
>;
export async function getSubmittedArticles() {
  let articles = await db.article.findMany({
    where: {
      status: "submitted",
      approved: false,
      deletedAt: null,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      status: true,
      approved: true,
      main_image: true,
      author: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar_url: true,
          username: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return articles;
}

// get submitted articles count
export async function getSubmittedArticlesCount() {
  let articles = await db.article.count({
    where: {
      status: "submitted",
      approved: false,
      deletedAt: null,
    },
  });
  return articles;
}

// get user's articles count
export async function getUsersArticlesCount() {
  let user = await useCurrentUser();

  if (!user) return 0;
  let articlesCount = await db.article.count({
    where: {
      deletedAt: null,
      OR: [
        { status: "submitted" || "published" || "revisions_requested" },
        {
          approved: true,
        },
      ],
      NOT: {
        userId: user?.id,
      },
    },
  });
  return articlesCount;
}

export type TPublishedArticles = Awaited<
  ReturnType<typeof getPublishedArticles>
>;
export async function getPublishedArticles() {
  let articles = await db.article.findMany({
    where: {
      status: "published",
      approved: true,
      deletedAt: null,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      status: true,
      approved: true,
      main_image: true,
      author: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar_url: true,
          username: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  let formartedArticles = articles.map((article) => {
    return {
      ...article,
      tags: article.tags.map((tag) => tag.tag),
    };
  });

  return formartedArticles;
}

export type TArticleBySlug = Awaited<ReturnType<typeof getArticleBySlug>>;

export async function getArticleBySlug(slug: string) {
  let article = await db.article.findFirst({
    where: {
      slug,
      status: "published",
      approved: true,
      deletedAt: null,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      status: true,
      approved: true,
      main_image: true,

      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },

      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      author: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar_url: true,
          username: true,
        },
      },
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!article) return null;
  let formattedarticle = {
    ...article,
    tags: article.tags.map((tag) => tag.tag),
  };

  return formattedarticle;
}

type getUserPublishedArticlesProps = {
  id?: string;
  username?: string;
};

export type TgetUserPublishedArticles = Awaited<
  ReturnType<typeof getUserPublishedArticles>
>;
export let getUserPublishedArticles = async ({
  id,
  username,
}: getUserPublishedArticlesProps) => {
  let articles;
  if (username && !id) {
    articles = await db.article.findMany({
      where: {
        author: {
          username,
        },
        status: "published",
        deletedAt: null,
      },
      select: {
        id: true,
        userId: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        status: true,
        approved: true,
        main_image: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  if (id && !username) {
    articles = await db.article.findMany({
      where: {
        userId: id,
        deletedAt: null,
        status: "published",
      },
      select: {
        id: true,
        userId: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        status: true,
        approved: true,
        main_image: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return articles ?? [];
};
