"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { trpc } from "@/server/client";
import { toast } from "sonner";

const QuickDraft = () => {
  let schema = z.object({
    title: z.string(),
    description: z.string().optional(),
  });

  let form = useForm<z.infer<typeof schema>>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });
  let { mutate: createDraft, isLoading } =
    trpc.article.createDraft.useMutation();
  let onSubmit = (data: z.infer<typeof schema>) => {
    createDraft(data, {
      onSuccess: () => {
        toast.success("Draft saved successfully!");
        form.reset({
          title: "",
          description: "",
        });
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isLoading} className="grid w-full space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  A good title will help you remember what you were thinking.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  Write a short description of your idea.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
        </fieldset>
      </form>
    </Form>
  );
};

export default QuickDraft;
