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
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormSchema } from "@/lib/validators/SignUpValidator";
import { trpc } from "@/server/client";

type SignUpFormProps = {};

export default function SignUpForm({}: SignUpFormProps) {
  const router = useRouter();
  const { mutate: signUpMutation, isLoading } = trpc.user.signUp.useMutation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await signUpMutation(data, {
      onSuccess() {
        toast.success("Signed up successfully!", {
          duration: 2500,
        });
        router.push("/sign-up?success=true");
      },
      onError(error) {
        toast.error(error.message, {
          duration: 2500,
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
            name="name"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            isLoading={isLoading}
            loadingText="Signing Up..."
            className="w-full"
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-background text-muted-foreground">Or</span>
        </div>
      </div>
      <Button
        type="button"
        onClick={() => {
          setLoading(true);
          signIn("google", { callbackUrl: "/dashboard" });
        }}
        isLoading={loading}
        disabled={isLoading}
        variant={"outline"}
        loadingText="Hang on..."
      >
        <>
          <FcGoogle className="w-4 h-4 mr-2" />
          Continue with Google
        </>
      </Button>
    </>
  );
}
