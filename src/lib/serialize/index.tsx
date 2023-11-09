"use client";

import React, { useRef } from "react";
import { Plate, TElement } from "@udecode/plate-common";
import { plugins } from "@/lib/plate/plate-plugins";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/ui/plate/editor";

interface PlateEditorProps {
  value: TElement[];
}

export default function PlateRender({ value }: PlateEditorProps) {
  const containerRef = useRef(null);

  return (
    <div className="px-2">
      <Plate
        readOnly
        editorRef={containerRef}
        plugins={plugins}
        initialValue={value}
      >
        <div
          ref={containerRef}
          className={cn(
            "h-full",
            "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4 editor-wrap",
          )}
        >
          <Editor
            className="px-[6px] py-10"
            autoFocus={false}
            focusRing={false}
            variant="ghost"
            size="md"
          />
        </div>
      </Plate>
    </div>
  );
}
