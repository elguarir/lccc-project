"use client";

import { trpc } from "@/server/client";

type Props = {
  id: string;
};

const useArticlePermissions = ({ id }: Props) => {
  let { data: article, isLoading: articleLoading } =
    trpc.article.getArticleById.useQuery({ id });
  let { data: currentUser, isLoading: userLoading } =
    trpc.user.currentUser.useQuery();

  let isDraft = article?.status === "draft";
  let isSubmitted = article?.status === "submitted";
  let isApproved = article?.approved;
  let isPublished = article?.status === "published";
  let isRevisionsRequested = article?.status === "revisions_requested";
  let isAdmin = currentUser?.role === "admin";
  let isAuthor = currentUser?.id === article?.userId;

  let canEdit = isDraft || isRevisionsRequested;
  let canDelete = isDraft || isRevisionsRequested || isAdmin;
  let canDuplicate = isDraft || isRevisionsRequested;
  let canUnpublish = isPublished && (isAdmin || isAuthor);

  return {
    articleStatus: article?.status,
    isApproved,
    isLoading: articleLoading || userLoading,
    canEdit,
    canUnpublish,
    canDelete,
    canDuplicate,
  };
};

export default useArticlePermissions;
