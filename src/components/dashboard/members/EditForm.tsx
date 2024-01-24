"use client";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formSchema } from "@/lib/validators/UserEditValidator";
import { trpc } from "@/server/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface EditFormProps {
  userId: string;
  user: z.infer<typeof formSchema>;
}

const EditForm = ({ userId, user }: EditFormProps) => {
  let form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user,
  });
  let { mutate: updateUser, isLoading } = trpc.user.updateUser.useMutation();
  let router = useRouter();
  let utils = trpc.useUtils();
  let refresh = () => {
    utils.user.getUsersList.invalidate();
  };

  let onSubmit = async (data: z.infer<typeof formSchema>) => {
    updateUser(
      { id: userId, ...data },
      {
        onSuccess: () => {
          toast.success("User updated successfully!");
          refresh();
          router.back();
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };
  return (
    <>
      <DialogHeader className="text-left">
        <DialogTitle>Edit Member</DialogTitle>
        <DialogDescription>
          Change the details of this user below, and submit the form to save
          changes.
        </DialogDescription>
      </DialogHeader>
      <div className="pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset disabled={isLoading} className="space-y-5">
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        First name
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Last name
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
              </div>

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Username
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Role
                      <span className="ml-1 text-red-600 opacity-70">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent className="z-[100]">
                        <SelectItem value="user">Member</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="flex flex-row justify-end gap-1 pt-3">
                <Button
                  onClick={() => router.back()}
                  size={"sm"}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  loadingText="Saving changes..."
                  type="submit"
                  size={"sm"}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </fieldset>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditForm;
