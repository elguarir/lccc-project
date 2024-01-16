"use client";

import { useArticleState } from "@/lib/store/useArticleState";

const ArticleStatus = () => {
  let saving = useArticleState((state) => state.saving);
  return (
    <span className="text-sm font-medium text-muted-foreground">
      Draft – {saving ? " Saving..." : " Saved"}
    </span>
  );
};

export default ArticleStatus;
