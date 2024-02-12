"use client";

import { Icons } from "@/assets/icons";
import React, { useState } from "react";
import { useCopyToClipboard } from "@/hooks/use-clipboard";
import { toast } from "sonner";
type Props = {
  text: string;
};

const CopyButton = ({ text }: Props) => {
  let [_, copy] = useCopyToClipboard();
  let [isCopied, setIsCopied] = useState(false);
  return (
    <button
      className="absolute p-1 transition-colors duration-300 rounded-full hover:bg-white/30 focus-visible:outline-primary top-9 right-3.5"
      onClick={() => {
        copy(text);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      }}
    >
      {isCopied ? (
        <Icons.check className="w-4 h-4 text-white" />
      ) : (
        <Icons.clipBoardCopy className="w-4 h-4 text-white" strokeWidth={4} />
      )}
    </button>
  );
};

export default CopyButton;
