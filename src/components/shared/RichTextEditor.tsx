"use client";
import { upload } from "@/hooks/use-cloudinary-upload";
import { uploadFile } from "@/hooks/use-s3-upload";
import { env } from "@/lib/env/client";
import EditorJS from "@editorjs/editorjs";
import { useCallback, useEffect, useRef, useState } from "react";

interface EditorProps {
  value?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

export default function RichTextEditor({
  value,
  onChange,
  disabled,
}: EditorProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const ref = useRef<EditorJS>();
  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    // @ts-ignore
    const Header = (await import("@editorjs/header" as any)).default;
    const AttachesTool = (await import("@editorjs/attaches" as any)).default;
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
        data: value,
        onChange: async () => {
          const savedData = await editor.save();
          if (onChange) onChange(savedData);
        },
        readOnly: disabled,
        placeholder: "Type your page content here...",
        inlineToolbar: true,
        tools: {
          header: {
            class: Header,
            config: {
              levels: [1, 2, 3, 4],
              defaultLevel: 3,
            },
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: `${env.NEXT_PUBLIC_BASE_URL}/api/fetchurl`,
            },
          },
          list: List,
          checklist: Checklist,
          image: {
            class: Image,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  let secure_url = await upload(file);
                  if (secure_url) {
                    return {
                      success: 1,
                      file: {
                        url: secure_url,
                      },
                    };
                  }
                },
                async uploadByUrl(url: string) {
                  return {
                    success: 1,
                    file: {
                      url,
                    },
                  };
                },
              },
            },
          },
          attaches: {
            class: AttachesTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  let file_url = await uploadFile(file);
                  if (file_url) {
                    return {
                      success: 1,
                      file: {
                        url: file_url,
                        size: file.size,
                        name: file.name,
                        extension: file.name?.split(".")?.pop(),
                      },
                      title: file.name,
                    };
                  }
                },
              },
            },
          },
          quote: Quote,
          delimiter: Delimiter,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

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
    <div
      data-disabled={disabled}
      className="w-full max-w-full transition-all duration-200 mx-auto space-y-2 prose dark:prose-neutral dark:prose-invert data-[disabled=true]:opacity-50"
    >
      <div
        id="editor"
        className="w-full max-w-[calc(100vw-40px)] sm:max-w-[calc(100vw-60px)] md:max-w-[calc(100vw-100px)] lg:max-w-[calc(100vw-480px)] xl:max-w-[calc(100vw-600px)] 2xl:max-w-[calc(100vw-800px)] rounded-lg p-4"
      />
    </div>
  );
}
