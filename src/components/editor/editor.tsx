"use client";
import useArticlePermissions from "@/hooks/use-article-permissions";
import { useDebounce } from "@/hooks/use-debounce";
import { useArticleState } from "@/lib/store/useArticleState";
import { cn } from "@/lib/utils";
import { trpc } from "@/server/client";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { useCallback, useEffect, useRef, useState } from "react";
interface EditorProps {
  initialValue?: OutputData;
  articleId: string;
}

export default function Editor({ initialValue, articleId }: EditorProps) {
  let [isMounted, setIsMounted] = useState<boolean>(false);
  let ref = useRef<EditorJS>();
  let [data, setData] = useState<OutputData | undefined>(initialValue);
  let debouncedData = useDebounce(data, 1500);
  let setSaving = useArticleState((state) => state.setSaving);
  let { mutate: update } = trpc.article.updateContent.useMutation();

  let { canEdit, isLoading: stateLoading } = useArticlePermissions({
    id: articleId,
  });
  useEffect(() => {
    console.log("canEdit", canEdit);
  }, [canEdit]);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    // @ts-ignore
    const Header = (await import("@editorjs/header" as any)).default;
    const Image = (await import("@editorjs/image" as any)).default;
    const Embed = (await import("@editorjs/embed" as any)).default;
    const Table = (await import("@editorjs/table" as any)).default;
    const List = (await import("@editorjs/list" as any)).default;
    const Code = (await import("@editorjs/code" as any)).default;
    const LinkTool = (await import("@editorjs/link" as any)).default;
    const InlineCode = (await import("@editorjs/inline-code" as any)).default;
    const Checklist = (await import("@editorjs/checklist" as any)).default;
    const Quote = (await import("@editorjs/quote" as any)).default;
    const Delimiter = (await import("@editorjs/delimiter" as any)).default;

    if (!ref.current) {
      const editor: EditorJS = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        data,
        onChange: async () => {
          const savedData = await editor.save();
          setData(savedData);
        },

        placeholder: "Type your page content here...",
        inlineToolbar: true,
        tools: {
          header: Header,
          linkTool: LinkTool,
          quote: Quote,
          list: List,
          checklist: Checklist,
          delimiter: Delimiter,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  // Update article content
  useEffect(() => {
    if (debouncedData) {
      if (!canEdit) return;
      setSaving(true);
      update(
        { id: articleId, content: debouncedData },
        {
          onSettled: () => {
            setSaving(false);
          },
          onError(error) {
            console.log(error);
          },
        },
      );
    }
  }, [debouncedData]);

  // isMounted is used to prevent SSR errors
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  // Initialize editor
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
        className={cn(
          "w-full max-w-[calc(100vw-40px)] sm:max-w-[calc(100vw-60px)] md:max-w-[calc(100vw-100px)] lg:max-w-[calc(100vw-480px)] xl:max-w-[calc(100vw-600px)] 2xl:max-w-[calc(100vw-800px)] rounded-lg px-6 p-4",
          (!canEdit || stateLoading) && "opacity-70 pointer-events-none",
        )}
      />
    </div>
  );
}
