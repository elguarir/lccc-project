"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormSchema } from "@/lib/validators/PasswordResetValidator";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/server/client";
type PasswordResetFormProps = {};

export default function PasswordResetForm({}: PasswordResetFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate: resetMutation, isLoading } =
    trpc.user.sendPasswordResetEmail.useMutation();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await resetMutation(data, {
      onError: (error) => {
        toast.error(error.message, {
          duration: 800,
        });
      },
      onSuccess: (data) => {
        toast.success("Password reset email has been sent!", {
          duration: 800,
        });
      },
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full text-xs font-medium transition-all duration-200 text-muted-foreground pt-1.5 !m-0">
            Password recovered?
            <Link className="hover:underline text-primary/70" href={"/sign-in"}>
              {" "}
              Sign In
            </Link>
          </div>
          <Button
            isLoading={isLoading}
            loadingText="Hang tight..."
            className="w-full"
            type="submit"
          >
            {" "}
            Reset Password
          </Button>
        </form>
      </Form>
    </>
  );
}
