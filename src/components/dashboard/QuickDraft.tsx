"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "@/lib/validators/DraftArticleValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { trpc } from "@/server/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function QuickDraft() {
  const { mutate: draftArticleMutation, isLoading } =
    trpc.article.draftArticle.useMutation();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    draftArticleMutation(data, {
      onSuccess: (data) => {
        toast.success("Created, Redirecting to editor...");
        router.push(`/editor/${data.id}`);
      },
    });
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Quick Draft</CardTitle>
        <CardDescription>
          What's on your mind ? Write a quick draft.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="The title of the article" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="a brief description about the article"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex justify-end p-0">
              <Button
                isLoading={isLoading}
                loadingText="Creating..."
                type="submit"
              >
                Create
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
