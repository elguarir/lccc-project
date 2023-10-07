import { GetArticleDataById } from "@/lib/helpers/GetArticleData";
import { GetUserArticles } from "@/lib/helpers/GetUserArticles";

export type UserArticlesType = Awaited<ReturnType<typeof GetUserArticles>>;
export type ArticleByIdType = Awaited<ReturnType<typeof GetArticleDataById>>;
