"use client";
import EditorJS from "@editorjs/editorjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function Editor() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const ref = useRef<EditorJS>();
  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    // @ts-ignore
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed" as any)).default;
    const Table = (await import("@editorjs/table" as any)).default;
    const List = (await import("@editorjs/list" as any)).default;
    const Code = (await import("@editorjs/code" as any)).default;
    const LinkTool = (await import("@editorjs/link" as any)).default;
    const InlineCode = (await import("@editorjs/inline-code" as any)).default;
    const Checklist = (await import("@editorjs/checklist" as any)).default;
    const Quote = (await import("@editorjs/quote" as any)).default;

    if (!ref.current) {
      const editor: EditorJS = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type your page content here...",
        inlineToolbar: true,
        tools: {
          header: Header,
          linkTool: LinkTool,
          quote: Quote,
          list: List,
          checklist: Checklist,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  return (
    <div className="w-full max-w-full mx-auto space-y-2 prose dark:prose-neutral dark:prose-invert">
      <div
        id="editor"
        className="w-full max-w-[calc(100vw-40px)] sm:max-w-[calc(100vw-60px)] md:max-w-[calc(100vw-100px)] lg:max-w-[calc(100vw-480px)] xl:max-w-[calc(100vw-600px)] rounded-lg px-6 p-4"
      />
    </div>
  );
}
