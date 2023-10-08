"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import UploadField from "../shared/UploadField";
import { useEffect, useState } from "react";
import DateWithTime from "./DateWithTime";
import { useEditorStore } from "@/store/EditorStore";
import { trpc } from "@/server/client";
import slugify from "slugify";
import { toast } from "sonner";
import axios from "axios";
import shallow from "zustand/shallow";

const articleSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(100, {
      message: "Title must be at most 100 characters long",
    }),
  slug: z.string().optional(),
  description: z.string().optional().nullable(),
  publishedAt: z.date().optional().nullable(),
  coverImage: z.string().optional().nullable(),
});

export default function ArticleDetailsForm() {
  const articleId = useEditorStore((state) => state.article?.id);
  const articleTitle = useEditorStore((state) => state.article?.title);
  const syncArticle = useEditorStore((state) => state.syncArticle);
  const [loading, setLoading] = useState(true);
  const { mutate: updateMutation, isLoading } =
    trpc.article.updateArticleDetails.useMutation();

  // const initialData = trpc.article.

  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
  });

  const { title } = form.watch();

  async function onSubmit(data: z.infer<typeof articleSchema>) {
    const { title, description, publishedAt, coverImage } = data;
    const slug = slugify(articleTitle + "-" + new Date().getTime(), {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      trim: true,
    });
    if (!articleId) return;
    updateMutation(
      {
        articleId: articleId,
        title,
        description,
        slug,
        coverImage,
        publishedAt,
      },
      {
        onSuccess: () => {
          toast.success("Article details saved.", {
            position: "bottom-center",
          });
          syncArticle();
        },
      },
    );
  }

  useEffect(() => {
    const getInitialData = async (id: string) => {
      const res = await axios.get(`/api/articles/${articleId}`);
      if (articleId && res.data) {
        const { title, description, publishedAt, coverImage } = res.data;
        form.setValue("title", title as string);
        form.setValue("description", description);
        form.setValue("publishedAt", new Date(publishedAt ?? new Date()));
        form.setValue("coverImage", coverImage);
      }
    };
    if (articleId) {
      getInitialData(articleId);
      setLoading(false);
    }
  }, [articleId]);
  if (loading)
    return (
      <div className="flex flex-col justify-center flex-1 h-screen">
        <div>
          <div className="flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-muted-foreground animate-spin" />
          </div>
          <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
            Loading...
          </div>
        </div>
      </div>
    );

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full space-y-2">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  The title of your article. Make it catchy!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field, fieldState }) => {
              let slug = "";
              if (title) {
                slug = slugify(title + "-" + new Date().getTime(), {
                  lower: true,
                });
              }
              return (
                <FormItem className="w-full space-y-2">
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input readOnly value={slug} />
                  </FormControl>
                  <FormDescription>
                    The slug of your article. This will be used in the URL.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field: { value, onChange, ...rest } }) => (
              <FormItem className="w-full space-y-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea value={value || ""} onChange={onChange} {...rest} />
                </FormControl>
                <FormDescription>
                  A short description of your article, this will be used as the
                  meta description for search engines.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* publish date */}
          <FormField
            control={form.control}
            name="publishedAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Publish Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          <>
                            {format(new Date(field?.value), "PPP 'at' h:mm a")}
                          </>
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <div>
                      <DateWithTime
                        value={field.value as Date}
                        onChange={field.onChange}
                        disabled={(date: Date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The date your article will be published.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {/* Cover Image */}
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem className="w-full space-y-2">
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <UploadField
                      value={field.value}
                      onChange={(value) => {
                        form.setValue("coverImage", value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be the main image for your article.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-end w-full">
            <Button
              isLoading={isLoading}
              loadingText="Saving..."
              type="submit"
              size={"sm"}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
