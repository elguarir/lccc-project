import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const MaxWidthWrapper = ({ children, className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={cn(
        "container relative md:pt-10 flex-1 w-full px-12 mx-auto max-md:px-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
