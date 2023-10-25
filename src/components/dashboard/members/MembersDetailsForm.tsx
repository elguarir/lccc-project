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
import { schema } from "@/lib/validators/MemberCreation";

import { Button } from "@/components/ui/button";
import PlateEditor from "@/components/BasicEditor";
import { trpc } from "@/server/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

interface Props {
  user?: User;
}

export default function MembersDetailsForm(props: Props) {
  const router = useRouter();

  let initialValues = undefined;
  if (props.user) {
    initialValues = {
      name: props.user.name ?? undefined,
      email: props.user.email ?? undefined,
      password: undefined,
      role: props.user.role,
      image: props.user.image ?? undefined,
      bio: props.user.bio ?? undefined,
      contact: props.user.contact ?? undefined,
    };
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialValues ?? {
      name: "",
      email: "",
      password: "",
      role: "USER",
      image: "",
      bio: "",
      contact: "",
    },
  });

  const { mutate: createMember, isLoading: isCreating } =
    trpc.member.createUser.useMutation();
  const { mutate: updateMember, isLoading: isUpdating } =
    trpc.member.updateUser.useMutation();

  async function onSubmit(data: z.infer<typeof schema>) {
    console.log(data);
    if (props.user) {
      updateMember(
        {
          id: props.user.id,
          email: data.email,
          name: data.name,
          role: data.role,
          image: data.image,
          bio: data.bio,
          contact: data.contact,
        },
        {
          onSuccess: () => {
            toast.success(`Member updated successfully!`);
          },
          onError: (error) => {
            toast.error(error.message ?? "Something went wrong!");
          },
        },
      );
    } else {
      createMember(
        {
          email: data.email,
          name: data.name,
          role: data.role,
          image: data.image,
          bio: data.bio,
          contact: data.contact,
        },
        {
          onSuccess: (data) => {
            toast.success(`Member added successfully!`);
            router.push("/dashboard/members");
          },
          onError: (error) => {
            toast.error(error.message ?? "Something went wrong!");
          },
        },
      );
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form.getValues());
          }}
          className="grid w-full grid-cols-1 p-4 border border-dashed rounded-lg gap-y-6 gap-x-4 xl:p-6 xl:grid-cols-2"
        >
          <div className="flex flex-col w-full gap-8 space-y-2 xl:flex-row xl:col-span-2">
            {/* Image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="w-full space-y-2 xl:w-1/2 xl:col-span-2">
                  <FormLabel>Member Avatar</FormLabel>
                  <FormControl>
                    <SingleImageField
                      image={field.value ?? ""}
                      setImage={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col w-full space-y-2 xl:w-1/2">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field: { value, ...rest } }) => (
                  <FormItem className="w-full space-y-2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...rest} value={value ?? undefined} />
                    </FormControl>
                    <FormDescription>The name of the member.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      The email of the member, this will be used to login.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <div className="flex items-center w-full gap-4">
                      <Select
                        onValueChange={(value) => {
                          form.setValue("role", value as "USER" | "ADMIN");
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="p-0 rounded-lg">
                          {/* <MenubarSeparator/> */}
                          <SelectItem value="USER">USER</SelectItem>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormDescription>
                      The role of the member, determines the permissions of the
                      member.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <>
                <FormItem className="w-full space-y-2 xl:col-span-2">
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    The bio of the member, a short description about the member,
                    this will be displayed on the member's page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          {/* Contact Info */}
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <>
                <FormItem className="w-full space-y-2 xl:col-span-2">
                  <FormLabel>Contact Info</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="eg => Email: johndoe@example.com \ Phone: +1234567890"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The contact info of the member, this will be displayed on
                    the member's page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <div className="xl:col-span-2">
            <Alert className="border-2 border-dashed">
              <QuestionMarkCircledIcon className="w-4 h-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription className=" [text-wrap:balance] ">
                {/* the password by default is 123456 */}
                The password by default for the created user is:{" "}
                <span className="font-bold">123456</span> — it can be changed
                later by the user.
              </AlertDescription>
            </Alert>
          </div>

          <div className="flex items-center justify-end w-full mt-4 xl:col-span-2">
            {props.user ? (
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
    </div>
  );
}
