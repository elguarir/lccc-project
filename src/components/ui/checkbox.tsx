"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border-2 focus-visible:border focus:border border-border transition-all dark:hover:border-neutral-600 hover:border-neutral-300 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
        className="w-4 h-4"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            type: "spring",
            ease: "easeOut",
            duration: 0.6,
          }}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
