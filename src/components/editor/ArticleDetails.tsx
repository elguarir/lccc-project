"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import slugify from "slugify";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, X } from "lucide-react";
import { useState } from "react";
import ImageUpload from "@/components/shared/ImageUpload";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Icons } from "@/assets/icons";
import { useArticleState } from "@/lib/store/useArticleState";
import { FormSchema } from "./FormSchema";

export default function ArticleDetails({
  formState,
  onSubmit,
}: {
  formState: ReturnType<typeof useForm<z.infer<typeof FormSchema>>>;
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
}) {
  return (
    <Form {...formState}>
      <form
        onSubmit={formState.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        <FormField
          control={formState.control}
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
                This is the title of your article.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formState.control}
          name="slug"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel>
                Slug
                <span className="ml-1 text-red-600 opacity-70">*</span>
              </FormLabel>
              <SlugInput value={value} onChange={onChange} rest={rest} />
              <FormDescription>
                This is the slug of your article, you can generate it from the
                title or choose one yourself.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formState.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Excerpt
                <span className="ml-1 text-red-600 opacity-70">*</span>
              </FormLabel>
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
          control={formState.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Cover Image
                <span className="ml-1 text-red-600 opacity-70">*</span>
              </FormLabel>
              <FormControl>
                <ImageUpload value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                This is the main image of your article.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formState.control}
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
                          formState.setValue(
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

        <FormField
          control={formState.control}
          name="publishedAt"
          render={({ field }) => (
            <FormItem>
              <div className="grid w-full gap-2">
                <FormLabel>
                  Published At
                  <span className="ml-1 text-red-600 opacity-70">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 h-9 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <FormDescription>
                This is the publish date of your article, once approved it will
                show up on the article.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end w-full">
          <Button size={"sm"} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

type TagInputProps = {
  value?: string[];
  onChange: (value: string[]) => void;
};

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

type SlugInputProps = {
  value?: string;
  onChange: (value: string) => void;
  rest: any;
};

const SlugInput = ({ value, onChange, rest }: SlugInputProps) => {
  let [editMode, setEditMode] = useState(false);
  let [inputValue, setInputValue] = useState(value);
  let { title } = useArticleState((state) => state);
  return (
    <div className="relative flex items-center w-full gap-2">
      <>
        <div className="relative flex items-center w-full">
          <FormControl>
            <Input
              {...rest}
              placeholder="article-slug-here"
              onChange={(e) => {
                setInputValue(e.target.value);
                onChange(e.target.value);
              }}
              value={inputValue}
              readOnly={editMode ? false : true}
              className="pr-8 h-9"
            />
          </FormControl>
          <button
            type="button"
            onClick={() => {
              if (editMode) {
                let slug = slugify(inputValue ?? "", {
                  lower: true,
                  strict: true,
                  trim: true,
                });
                setInputValue(slug);
                onChange(slug);
              }
              setEditMode(!editMode);
            }}
            className="absolute inset-y-0 translate-y-2/3 h-fit right-2 outline-primary "
          >
            {editMode ? (
              <Icons.check
                className={cn(
                  "w-4 h-4 transition-all duration-300 hover:text-primary",
                  editMode ? "text-primary" : "text-muted-foreground",
                )}
              />
            ) : (
              <Icons.EditIcon className="w-4 h-4 transition-all duration-300 hover:text-muted-foreground" />
            )}
          </button>
        </div>
      </>
      <Button
        onClick={() => {
          let slug = slugify(title, {
            lower: true,
            strict: true,
            trim: true,
          });
          setInputValue(slug);
          onChange(slug);
        }}
        type="button"
        size={"sm"}
        variant={"outline"}
      >
        Generate
      </Button>
    </div>
  );
};
