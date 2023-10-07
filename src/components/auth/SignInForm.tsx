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
import Link from "next/link";
import { FormSchema } from "@/lib/validators/SignInValidator";
import { useMutation } from "@tanstack/react-query";
type SignInFormProps = {};

export default function SignInForm({}: SignInFormProps) {
  const router = useRouter();
  const [googleLoading, setGoogleLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate: signInMutation, isLoading } = useMutation(
    async (data: z.infer<typeof FormSchema>) => {
      return await signIn(
        "credentials",
        {
          email: data.email,
          password: data.password,
          redirect: false,
          callbackUrl: "/dashboard",
        },
        { callbackUrl: "/dashboard" },
      );
    },
    {
      onSuccess: (res) => {
        if (!res?.url) {
          toast.error("The provided credentials are invalid.", {
            duration: 2500,
          });
        }
        if (res?.url) {
          toast.success(
            "Successfully signed in! Redirecting you to your dashboard...",
            {
              duration: 1750,
            },
          );
          setTimeout(() => {
            router.push("/dashboard");
          }, 750);
        }
      },
    },
  );

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await signInMutation(data);
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
          <div className="w-full py-0.5 !m-0">
            <Link
              className="text-xs font-medium transition-all duration-200 text-muted-foreground hover:underline"
              href={"/reset-password"}
            >
              Password forgotten?
            </Link>
          </div>
          <Button
            disabled={isLoading || googleLoading}
            isLoading={isLoading}
            loadingText="Signing in..."
            className="w-full"
            type="submit"
          >
            Sign in
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
      {/* google sign in button */}
      <Button
        type="button"
        onClick={() => {
          setGoogleLoading(true);
          signIn("google", { callbackUrl: "/dashboard" });
        }}
        isLoading={googleLoading}
        variant={"outline"}
        disabled={isLoading}
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
