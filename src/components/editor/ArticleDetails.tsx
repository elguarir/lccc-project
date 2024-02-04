"use client";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import ImageUpload from "@/components/shared/ImageUpload";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { FormSchema } from "@/lib/validators/ArticleDetailsValidator";
import slugIt from "@/lib/helpers/slugify";
import { trpc } from "@/server/client";
import ConfirmDialog from "./ConfirmDialog";
import { TConductorInstance } from "react-canvas-confetti/dist/types";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { SlugInput } from "../shared/SlugInput";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import useArticlePermissions from "@/hooks/use-article-permissions";

export default function ArticleDetails({
  formState,
  articleId,
}: {
  formState: ReturnType<typeof useForm<z.infer<typeof FormSchema>>>;
  articleId: string;
}) {
  const title = formState.watch("title");
  const [conductor, setConductor] = useState<TConductorInstance>();
  const { mutate: saveDraft, isLoading: savingDraft } =
    trpc.article.saveDraft.useMutation();
  const { data: categories, isLoading: categoriesLoading } =
    trpc.article.getArticleCategories.useQuery();
  let { canEdit, isLoading, articleStatus } = useArticlePermissions({
    id: articleId,
  });

  let { mutateAsync: checkSlug } = trpc.article.checkSlug.useMutation();

  const fire = () => {
    if (conductor) {
      conductor.shoot();
    }
  };
  const onInit = ({ conductor }: { conductor: TConductorInstance }) => {
    setConductor(conductor);
  };

  let utils = trpc.useUtils();
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    saveDraft(
      {
        id: articleId,
        title: data.title,
        slug: data.slug!,
        coverImage: data.coverImage!,
        excerpt: data.excerpt!,
        publishedAt: data.publishedAt!,
        tags: data.tags!,
        category: data.category,
      },
      {
        onSuccess: () => {
          toast.success("Article details saved as draft!", {
            duration: 1500,
            position: "bottom-left",
          });
          utils.article.getArticleById.invalidate({ id: articleId });
        },
      },
    );
  };
  return (
    <div className="flex flex-col gap-2">
      {articleStatus === "submitted" && (
        <Alert variant={"warning"} className="px-2 py-3 space-x-2.5 space-y-0">
          <InfoCircledIcon className="w-4 h-4 text-warning-600" />
          <AlertTitle className="text-sm font-semibold">Heads up!</AlertTitle>
          <AlertDescription className="text-xs">
            You can't edit this article details because it has been submitted
            for review.
          </AlertDescription>
        </Alert>
      )}
      <Form {...formState}>
        <form onSubmit={formState.handleSubmit(onSubmit)}>
          <fieldset
            className="w-full space-y-6"
            disabled={savingDraft || !canEdit || isLoading}
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
                  <SlugInput
                    value={value}
                    title={title ?? ""}
                    checkSlug={async (slug) => {
                      return await checkSlug({ slug });
                    }}
                    onChange={onChange}
                    rest={rest}
                  />
                  <FormDescription>
                    This is the slug of your article, you can generate it from
                    the title or choose one yourself.
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
                  <ImageUpload
                    control={true}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormDescription>
                    This is the main image of your article.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formState.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category
                    <span className="ml-1 text-red-600 opacity-70">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoriesLoading && (
                        <div className="flex items-center justify-center text-sm font-medium py-14">
                          Loading...
                        </div>
                      )}
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                      {categories && categories.length === 0 && (
                        <div className="flex items-center justify-center text-sm font-medium py-14">
                          No categories found
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
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
                        <button
                          type="button"
                          className="rounded-full cursor-default focus-visible:outline-primary disabled:opacity-60"
                        >
                          <Badge
                            className="flex items-center gap-1 pr-2"
                            variant={"outline"}
                            key={index}
                          >
                            {tag.name}
                            <button
                              onClick={() => {
                                formState.setValue(
                                  "tags",
                                  field?.value?.filter(
                                    (t, i) => t.slug !== tag.slug,
                                  ),
                                );
                              }}
                              type="button"
                              className="focus-visible:outline-primary"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        </button>
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
                    This is the publish date of your article, once approved it
                    will show up on the article.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end w-full gap-2">
              <Button
                isLoading={savingDraft}
                loadingText="Saving..."
                size={"sm"}
                variant={"outline"}
                type="submit"
              >
                Save as draft
              </Button>
              <ConfirmDialog articleId={articleId} fireConfetti={fire} />
            </div>
          </fieldset>
        </form>
        <Realistic
          globalOptions={{
            resize: true,
          }}
          onInit={onInit}
        />
      </Form>
    </div>
  );
}

type TagInputProps = {
  value?: {
    id: string;
    name: string;
    slug: string;
  }[];
  onChange: (value: z.infer<typeof FormSchema>["tags"]) => void;
};

const TagInput = ({ value, onChange }: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");
  let inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: createTag, isLoading } =
    trpc.article.createTag.useMutation();
  const handleSubmit = async () => {
    let alreadyExists = value?.find((tag) => tag.slug === slugIt(inputValue));
    if (alreadyExists) {
      setInputValue("");
      return;
    }
    if (inputValue) {
      await createTag(
        { name: inputValue },
        {
          onSuccess: (data) => {
            onChange([...(value ?? []), data]);
            setInputValue("");
            inputRef.current?.focus();
          },
        },
      );
    }
  };

  return (
    <div className="flex items-center w-full gap-2">
      <FormControl>
        <Input
          ref={inputRef}
          value={inputValue}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              await handleSubmit();
            }
          }}
          disabled={isLoading}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          className="h-9"
          placeholder="Write a tag and press enter..."
        />
      </FormControl>
      <Button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        isLoading={isLoading}
        size={"sm"}
        variant={"outline"}
      >
        Add
      </Button>
    </div>
  );
};
