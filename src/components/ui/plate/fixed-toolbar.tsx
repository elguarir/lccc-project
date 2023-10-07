import React from "react";

import { cn } from "@/lib/utils";

import { Toolbar, ToolbarProps } from "./toolbar";

const FixedToolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, children, ...props }: ToolbarProps, ref) => {
    return (
      <Toolbar
        ref={ref}
        className={cn(
          "supports-backdrop-blur:bg-background/60 px-0 sticky left-0 -top-0 z-50 w-full justify-between overflow-x-auto rounded-t-lg border-b border-b-border bg-background/95 backdrop-blur",
          className,
        )}
        {...props}
      >
        {children}
      </Toolbar>
    );
  },
);
FixedToolbar.displayName = "FixedToolbar";

export { FixedToolbar };
