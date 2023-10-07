"use client";

import React, { useEffect, useRef, useState } from "react";
import { CommentsProvider } from "@udecode/plate-comments";
import { Plate, TElement, Value } from "@udecode/plate-common";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { commentsUsers, myUserId } from "@/lib/plate/comments";
import { plugins } from "@/lib/plate/plate-plugins";
import { cn } from "@/lib/utils";
import { CursorOverlay } from "@/components/ui/plate/cursor-overlay";
import { Editor } from "@/components/ui/plate/editor";
import { FixedToolbar } from "@/components/ui/plate/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/ui/plate/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/ui/plate/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/ui/plate/floating-toolbar-buttons";
import initialEditorValue from "@/lib/constants/initialEditorValue";
import { ArticleByIdType } from "@/types/article";
import { useEditorStore } from "@/store/EditorStore";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";

interface PlateEditorProps {
  initialData?: ArticleByIdType;
}

export default function PlateEditor({ initialData }: PlateEditorProps) {
  const containerRef = useRef(null);
  const initialJson = initialData?.json as TElement[];
  const articleState = useEditorStore((state) => state.article);
  const setArticle = useEditorStore((state) => state.setArticle);
  const setSaving = useEditorStore((state) => state.setSaving);
  const debouncedValue = useDebounce<Prisma.JsonValue | undefined>(
    articleState?.json,
    800,
  );
  const updateMutation = useMutation({
    mutationFn: async (json: Prisma.ArticleCreateArgs["data"]["json"]) => {
      setSaving(true);
      return await axios.post(`/api/articles/${initialData?.id}`, {
        json: debouncedValue,
      });
    },
  });

  const handleSave = () => {
    if (articleState?.json) {
      updateMutation.mutate(articleState.json, {
        onSettled: () => {
          setSaving(false);
        },
      });
    }
  };
  useEffect(() => {
    if (initialData) {
      setArticle(initialData);
    }
  }, []);

  useEffect(() => {
    if (debouncedValue) {
      handleSave();
    }
  }, [debouncedValue]);

  return (
    <div className="px-2">
      <DndProvider backend={HTML5Backend}>
        <CommentsProvider users={commentsUsers} myUserId={myUserId}>
          <Plate
            plugins={plugins}
            value={(articleState?.json ?? initialJson) as Value}
            onChange={(nv) => {
              // @ts-ignore
              setArticle({
                ...articleState,
                json: nv as any,
              });
            }}
            initialValue={initialJson ?? initialEditorValue}
          >
            <div
              ref={containerRef}
              className={cn(
                "h-full",
                // Block selection
                // '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4 editor-wrap'
              )}
            >
              <FixedToolbar>
                <FixedToolbarButtons />
              </FixedToolbar>

              <Editor
                className="px-[20px] min-h-[calc(100vh-200px)] pt-8 pb-16"
                autoFocus
                focusRing={false}
                variant="ghost"
                size="md"
              />

              <FloatingToolbar>
                <FloatingToolbarButtons />
              </FloatingToolbar>

              {/* <MentionCombobox items={MENTIONABLES} /> */}

              {/* <CommentsPopover /> */}

              <CursorOverlay containerRef={containerRef} />
            </div>
          </Plate>
        </CommentsProvider>
      </DndProvider>
    </div>
  );
}
