"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSub,
  DropdownMenuSeparator,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/assets/icons";
import { trpc } from "@/server/client";
import { toast } from "sonner";
import { RouterOutput } from "@/types/router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { schema } from "@/lib/validators/PasswordChangeValidator";
import { Input } from "@/components/ui/input";
interface ActionButtonsProps {
  member: RouterOutput["member"]["getMembers"][0];
}

export function ActionButtons({ member }: ActionButtonsProps) {
  const utils = trpc.useContext();
  const { mutate: deleteUser } = trpc.member.deleteUser.useMutation();
  const { mutate: updateRole } = trpc.member.changeRole.useMutation();
  const { mutate: resetPassword, isLoading: isResetting } =
    trpc.member.resetPassword.useMutation();
  const [isOpen, setIsOpen] = useState(false);
  const refresh = () => {
    utils.member.getMembers.invalidate();
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    resetPassword(
      {
        id: member.id,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
      {
        onSuccess: () => {
          toast.success("Password has been reset successfully!");
          setIsOpen(false);
        },
        onError(error) {
          toast.error(error.message);
        },
      },
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="p-0 outline-none w-7 h-7 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 "
            variant={"secondary"}
          >
            <Icons.moreIcon className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="mt-1 py-2 w-[220px] rounded-xl px-3"
        >
          {/*  */}

          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Icons.EditIcon className="w-4 h-4 mr-2 stroke-[2.2px]" />
            <span>Change Password</span>
          </DropdownMenuItem>

          {/* update role */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <>
                <Icons.usersIcon className="w-4 h-4 mr-2 stroke-[2.2px]" />
                <span>Change Role</span>
              </>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => {
                    updateRole(
                      {
                        id: member.id,
                        role: "ADMIN",
                      },
                      {
                        onSuccess: () => {
                          toast("Role updated successfully!");
                          refresh();
                        },
                        onError: (err) => {
                          toast.error(err.message);
                        },
                      },
                    );
                  }}
                >
                  <div className="w-6">
                    {member.role === "ADMIN" && (
                      <Icons.check className="w-4 h-4 stroke-[2.2px]" />
                    )}
                  </div>
                  <span>ADMIN</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    updateRole(
                      {
                        id: member.id,
                        role: "USER",
                      },
                      {
                        onSuccess: () => {
                          toast("Role updated successfully!");
                          refresh();
                        },
                        onError: (err) => {
                          toast.error(err.message);
                        },
                      },
                    );
                  }}
                >
                  <div className="w-6">
                    {member.role === "USER" && (
                      <Icons.check className="w-4 h-4 stroke-[2.2px]" />
                    )}
                  </div>
                  <span>USER</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            onClick={() => {
              deleteUser(
                {
                  id: member.id,
                },
                {
                  onSuccess: () => {
                    toast("User deleted successfully!");
                    refresh();
                  },
                  onError: (err) => {
                    toast.error(err.message);
                  },
                },
              );
            }}
            className="text-destructive hover:text-red-600 focus:text-red-600"
          >
            <Icons.deleteTrashCan className="w-4 h-4 mr-2 stroke-[2.2px]" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Passowrd</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full space-y-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full space-y-2">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                <Button
                  isLoading={isResetting}
                  loadingText="Saving..."
                  type="submit"
                >
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
          {/* <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
