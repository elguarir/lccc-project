"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { formatDistance, subDays } from "date-fns";
import { DotsVerticalIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { Heart, ReplyIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { trpc } from "@/server/client";
import { useAuth } from "@clerk/nextjs";
import { TGetComments } from "@/server/routers/comment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import Link from "next/link";

type Props = {
  articleId: string;
  initialData: TGetComments;
};

const ArticleComments = ({ articleId, initialData }: Props) => {
  let formSchema = z.object({
    content: z
      .string()
      .min(10, "Comment too short")
      .max(500, "Comment too long"),
  });
  let { mutateAsync: createComment, isLoading } =
    trpc.comment.createComment.useMutation();
  let form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  let utils = trpc.useUtils();
  let refresh = () => {
    utils.comment.getComments.invalidate({ id: articleId });
  };

  let { data } = trpc.comment.getComments.useQuery(
    {
      id: articleId,
    },
    {
      initialData,
    },
  );

  let onSubmit = async (data: z.infer<typeof formSchema>) => {
    await createComment({
      articleId,
      body: data.content,
    });
    form.setValue("content", "");
    refresh();
  };

  return (
    <section className="flex flex-col pb-10">
      <h4 className="text-2xl font-bold tracking-tight md:text-3xl">
        Member discussion
      </h4>
      <div className="py-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset disabled={isLoading} className="flex flex-col w-full">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel /> */}
                    <FormControl>
                      <textarea
                        value={field.value}
                        onChange={field.onChange}
                        className="flex aria-[invalid=true]:border-destructive/80 min-h-[80px] hover:border-muted-foreground/25 transition-colors w-full rounded-md border-[2px] sm:border-2 border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="What are your thoughts?"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end mt-3">
                <Button
                  isLoading={isLoading}
                  type="submit"
                  size={"sm"}
                  className="px-4 py-0 min-w-[33px] text-sm font-medium h-[33px]"
                >
                  Reply
                </Button>
              </div>
            </fieldset>
          </form>
        </Form>
      </div>
      <div className="flex flex-col space-y-3">
        <div className="flex justify-start w-full">
          <Select defaultValue="newest">
            <SelectTrigger className="max-w-[128px] h-9">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="most-liked">Most liked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col pt-6 space-y-3">
        {data?.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} articleId={articleId} />
        ))}
      </div>
    </section>
  );
};

export default ArticleComments;

type CommentProps = {
  comment: TGetComments["comments"][0];
  articleId: string;
};

let Comment = ({
  comment: { id, body: content, edited, user, createdAt, likedBy },
  articleId,
}: CommentProps) => {
  let { mutate: like, isLoading } = trpc.comment.likeComment.useMutation();
  let { userId } = useAuth();
  let [editMode, setEditMode] = useState(false);

  let hasLiked = likedBy.some((id) => id === userId);
  let canEdit = userId === user.id;

  let utils = trpc.useUtils();
  let { mutateAsync: deleteComment, isLoading: isDeleting } =
    trpc.comment.deleteComment.useMutation();
  let refresh = () => {
    utils.comment.getComments.invalidate({ id: articleId });
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            href={`/author/${user.username}`}
            className="rounded-full focus-visible:outline-primary"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.avatar ?? ""} alt={`${user.first_name}`} />
              <AvatarFallback>
                {`${user.first_name[0]}${user.last_name[0]}`}
              </AvatarFallback>
            </Avatar>
          </Link>

          <div>
            <Link
              href={`/author/${user.username}`}
              className="text-sm font-semibold transition-colors rounded-full focus-visible:outline-primary hover:text-primary dark:hover:text-primary-400"
            >
              {`${user.first_name} ${user.last_name}`}
            </Link>
            <p className="text-xs text-muted-foreground">
              {formatDistance(new Date(createdAt), new Date(), {
                addSuffix: true,
              })}

              {edited && (
                <span className="text-xs text-muted-foreground"> (edited)</span>
              )}
            </p>
          </div>
        </div>
        <div>
          {canEdit && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size={"xs"} variant={"ghost"}>
                  <DotsVerticalIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setEditMode(true);
                  }}
                  disabled={!canEdit}
                  className="font-medium"
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    toast.promise(
                      deleteComment(
                        { commentId: id },
                        {
                          onSuccess: () => {
                            refresh();
                          },
                        },
                      ),
                      {
                        loading: "Deleting comment...",
                        success: "Comment deleted!",
                        error: "Error deleting comment!",
                        duration: 1500,
                        position: "bottom-center",
                      },
                    );
                  }}
                  disabled={!canEdit || isDeleting}
                  className="font-medium text-red-500 focus:bg-red-500 focus:text-white"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <div className="py-2">
        {editMode ? (
          <CommentEdit
            cancel={() => setEditMode(false)}
            content={content}
            commentId={id}
            articleId={articleId}
          />
        ) : (
          <p className="w-full text-sm whitespace-pre-wrap">{content}</p>
        )}
      </div>
      {!editMode && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant={"ghost"}
              size={"xs"}
              disabled={isLoading}
              className="focus-visible:outline-primary w-fit"
              onClick={() => {
                like(
                  { commentId: id },
                  {
                    onSuccess: () => {
                      refresh();
                    },
                  },
                );
              }}
            >
              {hasLiked ? (
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              ) : (
                <>
                  <Heart className="w-4 h-4" />
                </>
              )}
              {likedBy.length > 0 ? (
                <>
                  <span className="ml-2">{likedBy.length}</span>
                </>
              ) : (
                ""
              )}
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant={"ghost"}
                size={"xs"}
                className="flex items-center gap-2 w-fit focus-visible:outline-primary"
              >
                <ReplyIcon className="w-4 h-4" />
                <span className="text-sm font-medium">Reply</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

let CommentEdit = ({
  content,
  commentId,
  articleId,
  cancel,
}: {
  content: string;
  commentId: string;
  articleId: string;
  cancel: () => void;
}) => {
  let formSchema = z.object({
    content: z
      .string()
      .min(10, "Comment too short")
      .max(500, "Comment too long"),
  });
  let { mutateAsync: updateComment, isLoading } =
    trpc.comment.updateComment.useMutation();
  let form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content,
    },
  });
  let utils = trpc.useUtils();
  let refresh = () => {
    utils.comment.getComments.invalidate({ id: articleId });
  };

  let onSubmit = async (data: z.infer<typeof formSchema>) => {
    await updateComment({
      commentId,
      body: data.content,
    });
    refresh();
    cancel();
  };

  return (
    <div className="flex flex-col p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={isLoading} className="flex flex-col w-full">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      value={field.value}
                      onChange={field.onChange}
                      className="flex aria-[invalid=true]:border-destructive/80 min-h-[80px] hover:border-muted-foreground/25 transition-colors w-full rounded-md border-[2px] sm:border-2 border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="What are your thoughts?"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 mt-3">
              <Button
                disabled={isLoading}
                type="button"
                size={"sm"}
                variant={"ghost"}
                className="px-4 py-0 min-w-[33px] text-sm font-medium h-[33px]"
                onClick={() => cancel()}
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                type="submit"
                size={"sm"}
                className="px-4 py-0 min-w-[33px] text-sm font-medium h-[33px]"
              >
                Save
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};
