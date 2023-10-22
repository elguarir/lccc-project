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
import { schema } from "@/lib/validators/ServiceCreation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PlateEditor from "@/components/BasicEditor";
import { trpc } from "@/server/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Service } from "@prisma/client";
import SingleImageField from "@/components/shared/SingleImageField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MenubarLabel, MenubarSeparator } from "@/components/ui/menubar";
import { Loader2, PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  service?: Service;
}

export default function ServicesDetailsForm(props: Props) {
  const router = useRouter();

  let initialValues = undefined;
  if (props.service) {
    initialValues = {
      name: props.service.name,
      description: props.service.description!,
      json: props.service.json!,
      Image: props.service.Image,
      category: props.service.serviceCategoryId,
    };
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialValues ?? {
      Image: "",
      category: undefined,
      description: "",
      json: {},
      name: "",
    },
  });

  const { mutate: createService, isLoading: isCreating } =
    trpc.service.createService.useMutation();
  const { mutate: updateService, isLoading: isUpdating } =
    trpc.service.updateService.useMutation();

  const { data: categories, isLoading: categoriesLoading } =
    trpc.service.getCategories.useQuery();

  async function onSubmit(data: z.infer<typeof schema>) {
    if (props.service) {
      updateService(
        {
          id: props.service.id,
          name: data.name,
          description: data.description,
          json: data.json,
          category: data.category,
          Image: data.Image,
        },
        {
          onSuccess: () => {
            toast.success(`Service updated successfully!`);
          },
          onError: (error) => {
            toast.error(error.message ?? "Something went wrong!");
          },
        },
      );
    } else {
      createService(
        {
          name: data.name,
          description: data.description,
          Image: data.Image,
          json: data.json,
          category: data.category,
        },
        {
          onSuccess: (data) => {
            toast.success(`Service created successfully!`);
            // router.push("/dashboard/services");
          },
          onError: (error) => {
            toast.error(error.message ?? "Something went wrong!");
          },
        },
      );
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full grid-cols-1 p-4 border border-dashed rounded-lg gap-y-6 gap-x-4 xl:p-6 xl:grid-cols-2"
        >
          <div className="flex flex-col w-full gap-8 space-y-2 xl:flex-row xl:col-span-2">
            {/* Image */}
            <FormField
              control={form.control}
              name="Image"
              render={({ field }) => (
                <FormItem className="w-full space-y-2 xl:w-1/2 xl:col-span-2">
                  <FormLabel>Main Image</FormLabel>
                  <FormControl>
                    <SingleImageField
                      image={field.value}
                      setImage={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    The main image of the service.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col w-full space-y-2 xl:w-1/2">
              {/* Title */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full space-y-2">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>The title of the service.</FormDescription>
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
                      A short description of the service, this will be shown on
                      the services page and homepage.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <div className="flex items-center w-full gap-4">
                      <Select
                        onValueChange={(value) => {
                          form.setValue("category", value);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="p-0 rounded-lg">
                          <div className="flex items-center justify-between w-full px-3">
                            <MenubarLabel>Categories</MenubarLabel>
                          </div>
                          <MenubarSeparator className="mb-4" />
                          {categoriesLoading ? (
                            <div className="flex items-center justify-center px-1 py-4">
                              <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
                            </div>
                          ) : categories && categories.length > 0 ? (
                            categories?.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id}
                                onClick={() => {
                                  form.setValue("category", category.id);
                                }}
                              >
                                {category.name}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="px-1 py-4 text-sm text-center ">
                              No categories added yet...
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      <CategoryCreationModal />
                    </div>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

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
                        initialData={props.service?.json as any}
                        onChange={(v) => {
                          form.setValue("json", v as any);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    The description of the service, this will be shown on the
                    service details page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <div className="flex items-center justify-end w-full mt-4 xl:col-span-2">
            {props.service ? (
              <Button
                isLoading={isUpdating}
                loadingText="Updating..."
                type="submit"
                size={"sm"}
              >
                Update
              </Button>
            ) : (
              <Button
                isLoading={isCreating}
                loadingText="Saving..."
                type="submit"
                size={"sm"}
              >
                Save
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}

const CategoryCreationModal = () => {
  let [modal, setModal] = useState(false);
  const { mutate: createCategory, isLoading: isCreatingCategory } =
    trpc.service.createCategory.useMutation();
  let [name, setName] = useState("");
  const utils = trpc.useContext();

  const refreshCategories = () => {
    utils.service.getCategories.invalidate();
  };
  return (
    <>
      <Dialog modal={modal} onOpenChange={setModal}>
        <DialogTrigger asChild>
          <Button
            className="text-sm min-w-fit"
            variant={"outline"}
            type="button"
            onClick={() => setModal(true)}
          >
            <PlusIcon className="w-3.5 h-3.5 mr-1.5" />
            Add Category
          </Button>
        </DialogTrigger>
        <DialogContent className={cn("sm:max-w-[425px]", !modal && "hidden")}>
          <DialogHeader>
            <DialogTitle>Create a Category</DialogTitle>
            <DialogDescription>
              A category is a group of services, where each service can belong
              to one or more categories.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid w-full gap-4">
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                placeholder="eg. Industry"
              />
            </div>
            <DialogFooter>
              <Button
                size={"sm"}
                className="px-6"
                isLoading={isCreatingCategory}
                loadingText="Creating..."
                type="button"
                onClick={() => {
                  createCategory(
                    {
                      name,
                    },
                    {
                      onSuccess: (data) => {
                        refreshCategories();
                        setModal(false);
                        toast.success(`Category created successfully!`);
                      },
                      onError(error) {
                        toast.error(error.message ?? "Something went wrong!");
                      },
                    },
                  );
                }}
              >
                Create
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
