"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useEffect, type PropsWithChildren, useState } from "react";
import { dark } from "@clerk/themes";

export default function ClerkThemeProvider({ children }: PropsWithChildren) {
  const { resolvedTheme, setTheme } = useTheme();
  const [themeResolved, setThemeResolved] = useState(false);

  // Function to handle theme resolution
  const resolveTheme = () => {
    if (!themeResolved && resolvedTheme !== "system") {
      setThemeResolved(true);
    }
  };

  useEffect(() => {
    resolveTheme();
  }, [resolvedTheme]);

  useEffect(() => {
    if (themeResolved) {
      setTheme(resolvedTheme || "");
    }
  }, [themeResolved, setTheme, resolvedTheme]);

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
