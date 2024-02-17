import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  minimal?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, minimal, ...props }, ref) => {
    return (
      <input
        type={type}
        className={
          !minimal
            ? cn(
                "flex h-10 read-only:pointer-events-none read-only:select-none w-full hover:border-muted-foreground/25 transition-colors rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 ease-in-out file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[1.6px] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed read-only:opacity-70 disabled:opacity-50",
                className,
              )
            : cn(
                "flex h-10 aria-[invalid=true]:border-destructive/80 hover:border-muted-foreground/25 transition-colors w-full rounded-md border-[2px] sm:border-2 border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                className,
              )
        }
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
