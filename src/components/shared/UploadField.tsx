"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Icons } from "@/assets/icons";
import { useUpload } from "@/hooks/use-s3-upload";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/EditorStore";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Image from "next/image";

const UploadField = () => {
  const [loading, setLoading] = useState(false);
  const { uploadFile, url, progress } = useUpload();
  const [fileState, setFileState] = useState<File | null>(null);
  const setCoverImage = useEditorStore((state) => state.setCoverImage);
  const article = useEditorStore((state) => state.article);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setFileState(() =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    setLoading(true);
    await uploadFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDropRejected: () => {
      toast.error("Only images are allowed (jpeg, png).");
    },
    onDropAccepted(files, event) {
      if (files.length > 1) {
        toast.error("Only one image is allowed.");
        event.preventDefault();
      }
    },
    disabled: loading,
    noClick: loading,
  });

  useEffect(() => {
    if (url) {
      setCoverImage(url);
      setLoading(false);
    }
  }, [url]);

  return (
    <div className="flex flex-col space-y-2">
      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Featured Image
      </span>
      {article?.coverImage ? (
        <div className="flex overflow-hidden flex-col transition-[border] rounded-lg border bg-card text-card-foreground shadow-sm items-center justify-center h-44 gap-2">
          <div className="relative w-full h-full">
            <Image
              width={384}
              height={216}
              src={article.coverImage}
              className="object-cover aspect-video"
              alt="Featured Image"
            />
            <Button
              type="button"
              onClick={() => {
                setCoverImage(null);
                setFileState(null);
              }}
              size={"xs"}
              className="absolute bg-background/70 top-4 right-2"
              variant={"ghost"}
            >
              <Icons.delete className="w-4 h-4" strokeWidth={2} />
            </Button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps({})}
          className={cn(
            "flex overflow-hidden flex-col transition-[border] rounded-lg border bg-card text-card-foreground shadow-sm items-center justify-center h-44 gap-2",
            isDragActive && "border-2 border-primary/70",
            loading && "pointer-events-none opacity-70 cursor-not-allowed",
          )}
        >
          <input
            {...getInputProps({
              disabled: loading,
            })}
            className={cn(
              loading && "pointer-events-none opacity-70 cursor-not-allowed",
            )}
          />

          <>
            <Icons.ImageIcon className="w-12 h-12 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {fileState ? fileState.name : "Drag and drop your image here"}
            </span>
          </>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        This will be the main image for your article.
      </p>
    </div>
  );
};

export default UploadField;
