import { UserArticlesType } from "@/types/article";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { format, formatDistance, subDays } from "date-fns";
import Link from "next/link";
import React from "react";
import { ActionButtons } from "./ActionButtons";
import { Badge } from "@/components/ui/badge";

type Props = {
  article: UserArticlesType[0];
};

const ArticleCard = ({ article }: Props) => {
  return (
    <li
      key={article.id}
      className="relative flex items-center w-full gap-2 transition-colors duration-200 rounded-sm bg-background hover:bg-muted/80"
    >
      <Link
        className="flex items-center w-full gap-3 px-3 py-3"
        href={`/editor/${article.id}`}
      >
        {article.coverImage ? (
          <div className="overflow-hidden min-w-[2.75rem] rounded-[5px]">
            <img
              // aspect video
              className="hidden object-cover md:block h-11 aspect-video"
              src={article.coverImage}
              alt={article.title}
            />
          </div>
        ) : (
          <div className="overflow-hidden hidden md:flex h-11 aspect-video  items-center justify-center px-2 bg-secondary dark:bg-muted/80 rounded-[5px]">
            <QuestionMarkCircledIcon className="w-4 h-4 text-muted-foreground" />
          </div>
        )}

        <div className="flex flex-col flex-1 gap-0">
          <h3 className="text-sm font-semibold line-clamp-1 md:text-base">
            {article.title || "Untitled"}
          </h3>
          <div className="inline-flex text-xs tracking-wide gap-0.5 max-sm:flex max-sm:flex-col md:text-xs max-w-max text-muted-foreground">
            <div>
              by <span className="font-medium">{article.author.name}</span>
            </div>
            <div className="hidden sm:block">–</div>
            <div className="group">
              {formatDistance(
                subDays(new Date(article.createdAt), 0),
                new Date(),
                {
                  addSuffix: true,
                },
              )}
              <span className="hidden ml-1 transition-opacity duration-300 group-hover:inline-block">
                {" "}
                on {format(article.createdAt, "do MMM yyyy")}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className="relative">
        <Badge variant={article.status === "PUBLISHED" ? "success" : "outline"}>
          {article.status === "PUBLISHED"
            ? "Published"
            : article.status === "DRAFT"
            ? "Draft"
            : "Private"}
        </Badge>
      </div>
      <div className="pl-2 pr-3">
        <ActionButtons article={article} />
      </div>
    </li>
  );
};

export default ArticleCard;
