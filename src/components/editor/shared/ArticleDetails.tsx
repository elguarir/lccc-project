"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

const FormSchema = z.object({
  slug: z.string(),
  title: z.string().min(3).max(255),
  excerpt: z
    .string()
    .min(3, "The excerpt is too short.")
    .max(255, "The excerpt is too long."),
  publishedAt: z.date().optional(),
  tags: z.array(z.string()).optional(),
});

export default function ArticleDetails() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      slug: "my-first-article",
      tags: ["react", "typescript"],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <div className="relative flex items-center w-full gap-2">
                <FormControl>
                  <Input
                    className="h-9 focus-visible:ring-[1.6px]"
                    {...field}
                  />
                </FormControl>
                <Button size={"sm"} variant={"outline"}>
                  Generate
                </Button>
              </div>
              <FormDescription>
                The slug is automatically generated from the title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                This is used as the meta description for search engines.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tags
                <span className="text-xs text-muted-foreground">
                  {" "}
                  (optional)
                </span>
              </FormLabel>
              <TagInput value={field.value} onChange={field.onChange} />

              {field.value && field.value.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {field.value.map((tag, index) => (
                    <Badge
                      className="flex items-center gap-1"
                      variant={"outline"}
                      key={index}
                    >
                      {tag}
                      <button
                        onClick={() => {
                          form.setValue(
                            "tags",
                            field?.value?.filter((_, i) => i !== index) ?? [],
                          );
                        }}
                        type="button"
                        className="focus-visible:outline-primary"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
}

interface TagInputProps {
  value?: string[];
  onChange: (value: string[]) => void;
}

const TagInput = ({ value, onChange }: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex items-center w-full gap-2">
      <FormControl>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="h-9"
          placeholder="Write a tag and press enter..."
        />
      </FormControl>
      <Button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          const alreadyExists = value?.includes(inputValue);
          if (inputValue && !alreadyExists) {
            onChange([...(value ?? []), inputValue]);
            setInputValue("");
          } else {
            setInputValue("");
          }
        }}
        size={"sm"}
        variant={"outline"}
      >
        Add
      </Button>
    </div>
  );
};
