"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { trpc } from "@/server/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

type Props = {
  articleId: string;
};

const AddRevision = ({ articleId }: Props) => {
  let schema = z.object({
    body: z.string(),
  });

  let form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  let { mutate: create, isLoading } = trpc.article.createRevision.useMutation();
  let [editMode, setEditMode] = useState(false);
  let utils = trpc.useUtils();
  let refresh = () => {
    utils.article.getArticleRevisions.invalidate({ id: articleId });
  };
  let cancel = () => {
    setEditMode(false);
  };

  let onSubmit = async (data: z.infer<typeof schema>) => {
    create(
      { articleId, body: data.body },
      {
        onSuccess: () => {
          refresh();
          form.reset({ body: "" });
        },
      },
    );
  };

  if (!editMode)
    return (
      <Button
        onClick={() => setEditMode(true)}
        type="button"
        size={"xs"}
        className="min-w-[33px] text-sm font-medium"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Revision
      </Button>
    );
  else
    return (
      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={isLoading}>
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full"
                      minimal
                      placeholder="Add a revision..."
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
    );
};

export default AddRevision;
