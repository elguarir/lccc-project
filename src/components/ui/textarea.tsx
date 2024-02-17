import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minimal?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, minimal, ...props }, ref) => {
    return (
      <textarea
        className={
          !minimal
            ? cn(
                "flex min-h-[80px] hover:border-muted-foreground/25 transition-colors w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[1.6px] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className,
              )
            : cn(
                "flex aria-[invalid=true]:border-destructive/80 min-h-[80px] hover:border-muted-foreground/25 transition-colors w-full rounded-md border-[2px] sm:border-2 border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                className,
              )
        }
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
