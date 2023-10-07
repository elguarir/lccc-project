import { Icons } from "@/assets/icons";
import PasswordResetForm from "@/components/auth/PasswordResetForm";
import Link from "next/link";
import React from "react";

type Props = {};

function PasswordResetPage({}: Props) {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="w-10 h-10 mx-auto md:w-12 md:h-12" />
        <h1 className="text-3xl font-semibold tracking-tight font-display">
          Reset your password
        </h1>
        <p className="text-sm text-left text-muted-foreground max-w-prose">
          Enter your email address below. You will receive a link to reset your
          password.
        </p>
      </div>
      <PasswordResetForm />
      {/* <p className="px-8 text-sm text-center text-muted-foreground">
        <Link
          href="/sign-in"
          className="underline font-[450] transition-colors duration-300 hover:text-primary underline-offset-4"
        >
          Remembered your password? Sign in
        </Link>
      </p> */}
    </div>
  );
}

export default PasswordResetPage;
