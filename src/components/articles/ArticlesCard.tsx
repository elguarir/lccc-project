import { UserArticlesType } from "@/types/article";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { format, formatDistance, subDays } from "date-fns";
import Link from "next/link";
import React from "react";
import { ActionButtons } from "./ActionButtons";

type Props = {
  article: UserArticlesType[0];
};

const ArticleCard = ({ article }: Props) => {
  return (
    <li className="relative flex items-center w-full gap-2 transition-colors duration-200 rounded-sm bg-background hover:bg-muted/80">
      <Link
        className="flex items-center w-full gap-3 px-3 py-3"
        href={`/editor/${article.id}`}
      >
        {article.coverImage ? (
          <div className="overflow-hidden min-w-[2.75rem] rounded-[5px]">
            <img
              className="object-cover h-11 aspect-video"
              src={article.coverImage}
              alt={article.title}
            />
          </div>
        ) : (
          <div className="overflow-hidden h-11 aspect-video flex items-center justify-center px-2 bg-secondary dark:bg-muted/80 rounded-[5px]">
            <QuestionMarkCircledIcon className="w-4 h-4 text-muted-foreground" />
          </div>
        )}

        <div className="flex flex-1 gap-0.5 flex-col">
          <h3 className="text-base font-semibold line-clamp-1 md:text-lg">
            {article.title || "Untitled"}
          </h3>
          <div className="inline-flex gap-1 text-xs tracking-wide max-sm:flex max-sm:flex-col md:text-sm max-w-max text-muted-foreground">
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
              <span className="transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                {" "}
                on {format(article.createdAt, "do MMM yyyy")}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-4">
        <ActionButtons article={article} />
      </div>
    </li>
  );
};

export default ArticleCard;
