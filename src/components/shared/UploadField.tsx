"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Icons } from "@/assets/icons";
import { useUpload } from "@/hooks/use-s3-upload";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Image from "next/image";

interface UploadFieldProps {
  value: string | null | undefined;
  onChange: (value: string) => void;
}

const UploadField = (props: UploadFieldProps) => {
  const [loading, setLoading] = useState(false);
  const { uploadFile, progress } = useUpload({
    onUploadStarted: () => {
      setLoading(true);
    },
    onUploadComplete(url) {
      props.onChange(url);
      setLoading(false);
    },
    onError(error) {
      toast.error(error);
    },
  });
  const { value, onChange } = props;

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    uploadFile(file);
  }, []);

  useEffect(() => {
    console.log("image", value);
  }, [value]);

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

  return (
    <div className="relative">
      {value ? (
        <div className="flex overflow-hidden flex-col transition-[border] rounded-lg border bg-card text-card-foreground shadow-sm items-center justify-center h-44 gap-2">
          <div className="relative w-full h-full">
            <Image
              width={384}
              height={216}
              src={value}
              className="object-cover aspect-video"
              alt="Featured Image"
            />
            <Button
              type="button"
              onClick={() => {
                onChange("");
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

          {loading ? (
            <div>
              <span className="text-lg font-medium font-display text-muted-foreground">
                {progress}%
              </span>
            </div>
          ) : (
            <>
              <Icons.ImageIcon className="w-12 h-12 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Drag and drop your image here
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadField;
