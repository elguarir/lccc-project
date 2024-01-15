"use client";
import { useTheme } from "next-themes";
import React from "react";
import { Toaster } from "sonner";

const ToasterProvider = () => {
  const { theme } = useTheme();
  if (!theme) return null;
  return (
    <Toaster
      // there's some kind if ts error here that's why I used ternary operator xd, kinda weird.
      theme={
        theme === "system" ? "system" : theme === "light" ? "light" : "dark"
      }
      // richColors
      closeButton
    />
  );
};

export default ToasterProvider;
