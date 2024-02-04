"use client";
import { SlugInput } from "@/components/shared/SlugInput";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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
import { formSchema } from "@/lib/validators/CategoryCreationValidator";
import { trpc, trpcVanilla } from "@/server/client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  mode: "create" | "edit";
  categoryId?: string;
  children?: React.ReactNode;
  onClose?: () => void;
};

const CategoryForm = ({ mode, categoryId, onClose }: Props) => {
  let form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      if (!categoryId)
        return {
          title: "",
          slug: "",
        };

      let data = await trpcVanilla.category.getCategoryById.query({
        id: categoryId,
      });
      console.log("category fetched", data);
      return {
        title: data.name,
        slug: data.slug,
      };
    },
  });
  let utils = trpc.useUtils();

  let { mutate: createCategory, isLoading: isCreating } =
    trpc.category.createCategory.useMutation();
  let { mutate: updateCategory, isLoading: isUpdating } =
    trpc.category.updateCategory.useMutation();
  let { mutateAsync: checkSlug, isLoading: isChecking } =
    trpc.category.checkSlug.useMutation();
  let refresh = () => {
    utils.category.getCategories.invalidate();
  };

  let title = form.watch("title");

  let onSubmit = (data: z.infer<typeof formSchema>) => {
    if (mode === "create") {
      createCategory(data, {
        onSuccess: () => {
          form.reset();
          toast.success("Category created successfully!", {
            duration: 1250,
          });
          refresh();
          onClose && onClose();
        },
        onError: (error) => {
          toast.error(error.message, {
            duration: 1250,
          });
        },
      });
    }

    if (mode === "edit" && categoryId) {
      updateCategory(
        {
          id: categoryId,
          title: data.title,
          slug: data.slug,
        },
        {
          onSuccess: () => {
            toast.success("Category updated successfully!", {
              duration: 1250,
            });
            refresh();
            onClose && onClose();
          },
          onError: (error) => {
            toast.error(error.message, {
              duration: 1250,
            });
          },
        },
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          disabled={isCreating || isUpdating || form.formState.isLoading}
          aria-busy={isCreating || isUpdating || form.formState.isLoading}
          className="flex flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title
                  <span className="ml-1 text-red-600 opacity-70">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  The title of the category, make sure it's unique.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>
                  Slug
                  <span className="ml-1 text-red-600 opacity-70">*</span>
                </FormLabel>
                <FormControl>
                  <SlugInput
                    checkSlug={async () => {
                      return await checkSlug({ slug: value });
                    }}
                    title={title}
                    onChange={onChange}
                    value={value}
                    size="default"
                    rest={rest}
                  />
                </FormControl>
                <FormDescription>
                  The slug of the category, you can generate it from the title
                  or write it manually.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="pt-3">
            <Button
              type="submit"
              isLoading={isCreating || isUpdating}
              loadingText={
                {
                  create: "Creating...",
                  edit: "Saving...",
                }[mode]
              }
            >
              {
                {
                  create: "Create",
                  edit: "Save",
                }[mode]
              }
            </Button>
          </DialogFooter>
        </fieldset>
      </form>
    </Form>
  );
};

export default CategoryForm;
