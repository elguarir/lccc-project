import { Icons } from "@/assets/icons";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  searchParams?: {
    success?: boolean;
  };
};

function SignUpPage({ searchParams }: Props) {
  const { success } = searchParams || {};

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="w-10 h-10 mx-auto md:w-12 md:h-12" />
        <h1 className="text-3xl font-semibold tracking-tight font-display">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create your account.
        </p>
      </div>
      {success ? (
        <div className="flex flex-col items-center mx-auto">
          <div className="relative flex flex-col items-center justify-between p-4 mb-6 text-sm text-green-800 border rounded-lg bg-green-50 dark:bg-green-500/10 dark:text-green-500 border-green-500/10">
            <div className="flex items-center mb-2 space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 text-green-700 rounded-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h6 className="text-base scroll-m-20">
                <span className="text-base font-semibold">
                  Your account has been created successfully.
                </span>
              </h6>
            </div>
            <p className="font-medium">
              You can now login to your account and start creating!
            </p>
          </div>
          <Button className="w-full" variant={"outline"} asChild>
            <Link href={"/sign-in"}>
              Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <SignUpForm />
          <div className="px-8 text-sm text-center text-muted-foreground">
            <Link
              href="/sign-in"
              className="underline font-[450] transition-colors duration-300 hover:text-primary underline-offset-4"
            >
              Already have an account? Sign In
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default SignUpPage;
