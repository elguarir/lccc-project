import { Icons } from "@/assets/icons";
import SignInForm from "@/components/auth/SignInForm";
import Link from "next/link";
import React from "react";

type Props = {};

function SignInPage({}: Props) {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <img
          src="/images/somacep.png"
          alt=""
          className="w-32 mx-auto"
        />
        <h1 className="text-3xl font-semibold tracking-tight font-display">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to sign in to your account
        </p>
      </div>
      <SignInForm />
      <p className="px-8 text-sm text-center text-muted-foreground">
        {/* <Link
          href="/sign-up"
          className="underline font-[450] transition-colors duration-300 hover:text-primary underline-offset-4"
        >
          Don't have an account? Sign Up
        </Link> */}
      </p>
    </div>
  );
}

export default SignInPage;
