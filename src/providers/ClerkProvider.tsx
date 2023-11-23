"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import type { PropsWithChildren } from "react";
import { dark } from "@clerk/themes";

export default function ClerkThemeProvider({ children }: PropsWithChildren) {
  const { resolvedTheme } = useTheme();
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
        variables: {
          colorPrimary: resolvedTheme === "light" ? "#657dcc" : "#657dcc",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
