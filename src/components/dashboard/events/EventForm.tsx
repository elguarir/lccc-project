"use client";
import ImageUpload from "@/components/shared/ImageUpload";
import { SlugInput } from "@/components/shared/SlugInput";
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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimePicker } from "@/components/shared/TimePicker";
import RichTextEditor from "@/components/shared/RichTextEditor";
import { formSchema } from "@/lib/validators/EventCreationValidator";
import { trpc } from "@/server/client";
import { toast } from "sonner";

type EventFormProps = {
  mode: "create" | "edit";
  event?: {
    id: string;
    initialData: z.infer<typeof formSchema>;
  };
};

const EventForm = ({ mode, event }: EventFormProps) => {
  let { mutate: createEvent, isLoading: isCreating } =
    trpc.event.createEvent.useMutation();
  let { mutate: updateEvent, isLoading: isUpdating } =
    trpc.event.updateEvent.useMutation();
  let { mutateAsync: checkSlug } = trpc.event.checkSlug.useMutation();

  let form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: event?.initialData,
  });

  let utils = trpc.useUtils();
  let refresh = () => {
    utils.event.getEvents.invalidate();
  };

  let title = form.watch("title");
  let onSubmit = (data: z.infer<typeof formSchema>) => {
    if (mode === "edit" && event) {
      updateEvent(
        { id: event.id, ...data },
        {
          onSuccess: () => {
            toast.success("Event updated successfully!");
            refresh();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    } else {
      createEvent(data, {
        onSuccess: () => {
          toast.success("Event created successfully!");
          refresh();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          disabled={isCreating || isUpdating}
          className="flex flex-col w-full space-y-4"
        >
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
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
                  <FormDescription></FormDescription>
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
                      title={title}
                      onChange={onChange}
                      checkSlug={async (slug) => {
                        if (!slug) return "";
                        return await checkSlug({ slug });
                      }}
                      value={value}
                      size="default"
                      rest={rest}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
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
                  A short description of the event, used for SEO purposes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
            <FormField
              control={form.control}
              name="mainImage"
              render={({ field }) => (
                <FormItem className="xl:col-span-2">
                  <FormLabel>
                    Main Image
                    <span className="ml-1 text-red-600 opacity-70">*</span>
                  </FormLabel>
                  <ImageUpload
                    aspectVideo
                    control={true}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormDescription>
                    This is the main image of the event.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid w-full grid-cols-1 gap-1 xl:col-span-3">
              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Event Status
                        <span className="ml-1 text-red-600 opacity-70">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Is the event published or just a draft?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Location
                        <span className="ml-1 text-red-600 opacity-70">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Where is the event taking place?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Event Date
                      <span className="ml-1 text-red-600 opacity-70">*</span>
                    </FormLabel>
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
                              format(field.value, "MMMM do, yyyy 'at' HH:mm")
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
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <TimePicker
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <div className="border min-h-[300px] rounded-lg lg:px-12 border-input">
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isCreating || isUpdating}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  A longer description of the event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end w-full pt-3">
            <Button
              type="submit"
              isLoading={isCreating || isUpdating}
              loadingText={
                {
                  create: "Creating Event...",
                  edit: "Saving Changes...",
                }[mode]
              }
            >
              {
                {
                  create: "Create Event",
                  edit: "Save Changes",
                }[mode]
              }
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
};

export default EventForm;
