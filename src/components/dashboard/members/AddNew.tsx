"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import useMediaQuery from "@/hooks/use-media-query";
import { Plus } from "lucide-react";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { formSchema } from "@/lib/validators/UserCreationValidator";
import { trpc } from "@/server/client";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
let AddNewUser = () => {
  let { isTablet, isDesktop } = useMediaQuery();
  let [open, setOpen] = useState(false);
  let { mutate: createUser, isLoading } = trpc.user.createUser.useMutation();
  let formState = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  let onSubmit = async (data: z.infer<typeof formSchema>) => {};
  if (isTablet || isDesktop) {
    return (
      <Dialog key={144554} open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"sm"} className="flex items-center justify-center px-4">
            <span className="mr-2">New</span>
            <Plus className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[518px] outline-none">
            <DialogHeader>
              <DialogTitle>Add new user</DialogTitle>
              <DialogDescription className="pt-2"></DialogDescription>
              <ScrollArea className="max-h-[calc(100vh-50px)]">
                <div className="px-4">
                  <UserCreationForm
                    isLoading={isLoading}
                    setOpen={setOpen}
                    formState={formState}
                    onSubmit={onSubmit}
                  />
                </div>
              </ScrollArea>
            </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size={"sm"} className="flex items-center justify-center px-4">
          <span className="mr-2">New</span>
          <Plus className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="outline-none">
        <DrawerHeader className="text-left">
          <DrawerTitle>Add new user</DrawerTitle>
          <DrawerDescription className="pt-2"></DrawerDescription>
          <div>
            <UserCreationForm
              setOpen={setOpen}
              isLoading={isLoading}
              formState={formState}
              onSubmit={onSubmit}
            />
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default AddNewUser;

let UserCreationForm = ({
  formState,
  onSubmit,
  isLoading,
  setOpen,
}: {
  formState: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
  setOpen: (open: boolean) => void;
}) => {
  let { isTablet, isDesktop } = useMediaQuery();
  return (
    <Form {...formState}>
      <form onSubmit={formState.handleSubmit(onSubmit)}>
        <fieldset className="w-full space-y-4" disabled={isLoading}>
          <div className="grid w-full grid-cols-2 gap-2">
            <FormField
              control={formState.control}
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
              control={formState.control}
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
            control={formState.control}
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
            control={formState.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Role
                  <span className="ml-1 text-red-600 opacity-70">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={"user"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="z-[100]">
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  This will determine the user's permissions, and what they can
                  do on the platform.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formState.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email
                  <span className="ml-1 text-red-600 opacity-70">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formState.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password
                  <span className="ml-1 text-red-600 opacity-70">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        {isTablet || isDesktop ? (
          <DialogFooter className="flex flex-row justify-end gap-1 pt-3">
            <Button
              size={"sm"}
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button size={"sm"} loadingText="Adding user...">
              Add user
            </Button>
          </DialogFooter>
        ) : (
          <DrawerFooter className="flex flex-row items-center w-full gap-2 p-0 pt-4">
            <DrawerClose asChild>
              <Button type="button" className="w-full" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
            <Button
              className="w-full"
              type="submit"
              isLoading={isLoading}
              loadingText="Adding user..."
            >
              Add user
            </Button>
          </DrawerFooter>
        )}
      </form>
    </Form>
  );
};
