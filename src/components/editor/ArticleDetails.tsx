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
import { CalendarIcon } from "lucide-react";
import UploadField from "../shared/UploadField";
import { useEffect, useState } from "react";
import DateWithTime from "./DateWithTime";
import { useEditorStore } from "@/store/EditorStore";
import { useDebounce } from "@/hooks/use-debounce";
import { trpc } from "@/server/client";

const articleSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional().nullable(),
  publishedAt: z.date().optional().nullable(),
});

export default function ArticleDetailsForm() {
  const article = useEditorStore((state) => state.article);
  const syncArticle = useEditorStore((state) => state.syncArticle);
  const { mutate: updateMutation, isLoading } =
    trpc.article.updateArticleDetails.useMutation();

  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
  });

  const { getValues } = form;
  const formState = form.watch();

  async function onSubmit(data: z.infer<typeof articleSchema>) {
    console.log(data);
  }

  useEffect(() => {
    const title = article?.title;
    const description = article?.description;
    const publishedAt = article?.publishedAt;
    form.setValue("title", title);
    form.setValue("description", description);
    form.setValue("publishedAt", new Date(publishedAt || new Date()));
  }, [article]);

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
                        value={(field.value || new Date()) as Date}
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
            <UploadField />
          </div>
          <div className="flex items-center justify-end w-full">
            <Button
              isLoading={isLoading}
              loadingText="Saving..."
              onClick={() => {
                const data = getValues();
                if (!article) return;
                updateMutation(
                  {
                    articleId: article.id,
                    title: data.title,
                    description: data.description,
                    coverImage: article.coverImage,
                  },
                  {
                    onSuccess: () => {
                      syncArticle();
                    },
                  },
                );
              }}
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
