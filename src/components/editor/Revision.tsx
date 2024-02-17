"use client";
import { TgetArticleRevisions } from "@/server/routers/article";
import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { trpc } from "@/server/client";

type Props = {
  revision: TgetArticleRevisions[0];
};

const Revision = ({ revision }: Props) => {
  let [checked, setChecked] = useState(revision.resolved);
  let { mutate: update, isLoading } = trpc.article.updateRivision.useMutation();
  let utils = trpc.useUtils();
  let refresh = () => {
    utils.article.getArticleRevisions.invalidate({ id: revision.articleId });
  };
  return (
    <label
      key={revision.id}
      className={cn(
        "flex items-center w-full gap-4 whitespace-pre-wrap",
        checked && "line-through text-muted-foreground",
        isLoading && "pointer-events-none opacity-80",
      )}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={(v) => {
          setChecked(v === true ? true : false);
          update(
            { id: revision.id, resolved: v === true ? true : false },
            {
              onSettled: () => {
                refresh();
              },
            },
          );
        }}
        className="w-6 h-6 rounded-[5px]"
      />
      <div>{revision.body}</div>
    </label>
  );
};

export default Revision;
