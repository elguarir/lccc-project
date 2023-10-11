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
import { schema } from "@/lib/validators/ProjectCreation";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PlateEditor from "@/components/BasicEditor";
import MultipleImageField from "./MultipleImageField";
import { trpc } from "@/server/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProjectCreationForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      images: [],
      status: "DRAFT" as const,
    },
  });
  const router = useRouter();

  const { mutate: createProject, isLoading } =
    trpc.project.createProject.useMutation();

  async function onSubmit(data: z.infer<typeof schema>) {
    createProject(
      {
        title: data.title,
        client: data.client,
        description: data.description,
        json: data.json,
        startDate: data.startDate,
        endDate: data.endDate,
        images: data.images,
      },
      {
        onSuccess: (data, variables) => {
          toast.success("Project created!");
          router.push("/dashboard/projects");
        },
        onError: (error) => {
          toast.error("Something went wrong!");
        },
      },
    );
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full grid-cols-1 p-4 border border-dashed rounded-lg gap-y-6 gap-x-4 xl:p-6 xl:grid-cols-2"
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
                <FormDescription>The title of the project.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem className="w-full space-y-2">
                <FormLabel>Client</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  The client of the project, this will be shown on the project
                  details page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Brief */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full space-y-2 xl:col-span-2">
                <FormLabel>Brief</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  A short description of the project, this will be shown on the
                  projects and homepage.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Images */}
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="w-full space-y-2 xl:col-span-2">
                <FormLabel>Images</FormLabel>
                <FormControl>
                  {/* <div className="h-40 border rounded-lg bg-muted" {...field} /> */}
                  {/* {!field.value || field.value.length === 0 && (
                    <div className="h-40 border rounded-lg bg-muted" />
                  )} */}
                  <MultipleImageField
                    images={field.value}
                    setImages={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  A short description of the project, this will be shown on the
                  projects and homepage.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="json"
            render={({ field }) => (
              <>
                <FormItem className="w-full space-y-2 xl:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <div className="border-2 rounded-lg ">
                      <PlateEditor
                        value={field.value}
                        onChange={(v) => {
                          form.setValue("json", v as any);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    The description of the project, this will be shown on the
                    project details page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          {/* start date */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full space-y-2">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full xl:max-w-xs pl-3 text-left font-normal",
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
                      selected={field.value ?? undefined}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The date when this project started.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* end date */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end w-full space-y-2">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full xl:max-w-xs pl-3 text-left font-normal",
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
                      selected={field.value ?? undefined}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The date when this project ended.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end w-full mt-4 xl:col-span-2">
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

// const Editor = () => {
//   return (
//     <div className="w-full space-y-2 xl:col-span-2">
//       <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//         Description
//       </Label>
//       <div className="border-2 rounded-lg ">
//         <PlateEditor />
//       </div>
//       <div className="text-sm text-muted-foreground">
//         The description of the project, this will be shown on the project
//         details page.
//       </div>
//     </div>
//   );
// };
