import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUpload } from "@/hooks/use-multiple-upload";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Gauge } from "../ui/gauge";

type Props = {
  image: string;
  setImage: (value: string) => void;
};

interface FileState {
  file: File;
  progress: number;
  preview?: string;
  isUploaded?: boolean;
}

const SingleImageField = ({ image, setImage }: Props) => {
  let [file, setFile] = useState<FileState | null>(null);

  const { startUpload, removeUpload } = useUpload({
    onUploadComplete: (file, url) => {
      // @ts-ignore
      setFile(null);
      setImage(url);
      removeUpload(file);
    },
    onProgress: (file, progress) => {
      updateLocalFileState(file, progress);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      acceptedFiles.forEach((file) => {
        setImage("");
        setFile(null);
        setFile({ file, progress: 0, preview: URL.createObjectURL(file) });
        startUpload(file);
      });
    },
    [startUpload],
  );

  const updateLocalFileState = (file: File, progress: number) => {
    setFile((prevStates) => {
      return prevStates?.file === file
        ? { ...prevStates, progress }
        : prevStates;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    onDropRejected: (files) => {
      toast.error("Only images are allowed.");
    },
    accept: {
      "image/*": [
        ".jpeg",
        ".png",
        ".jpg",
        ".gif",
        ".webp",
        ".svg",
        ".bmp",
        ".tiff",
        ".jfif",
      ],
    },
  });

  useEffect(() => {
    console.log("file", file);
  }, [file]);

  if (!image && !file) {
    return (
      <div
        {...getRootProps()}
        className={cn(
          "p-4 border-2 border-dashed transition-colors duration-200 rounded-lg",
          isDragActive && "border-primary",
        )}
      >
        <div className="flex flex-col items-center justify-center py-6 col-span-full">
          <input {...getInputProps()} />
          <Icons.cloudUpload className="w-7 h-7" />
          <div className="text-sm text-center text-muted-foreground">
            Drag and drop an image here, or <br />
            <span className="font-semibold underline cursor-pointer text-primary">
              Click here to upload.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="grid w-full gap-4 p-4 border-2 border-dashed ">
      {image && (
        <div className="relative overflow-hidden rounded-lg aspect-video">
          <Button
            className="absolute w-5 h-5 p-0.5 rounded-[5px] top-3 right-2"
            type="button"
            size={"xs"}
            variant={"secondary"}
            onClick={() => {
              setImage("");
            }}
          >
            <X className="w-3 h-3" strokeWidth={2} />
          </Button>
          <img className="object-cover w-full h-full" src={image} />
        </div>
      )}

      {file && (
        <div className="relative overflow-hidden rounded-lg aspect-video">
          {file.progress !== 100 && (
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/60">
              <Gauge value={file.progress} size="medium" showValue={true} />
            </div>
          )}

          <Button
            className="absolute w-5 h-5 p-0.5 rounded-[5px] top-3 right-2"
            type="button"
            size={"xs"}
            variant={"secondary"}
            onClick={() => {
              setFile(null);
            }}
          >
            <X className="w-3 h-3" strokeWidth={2} />
          </Button>
          <img className="object-cover w-full h-full" src={file.preview} />
        </div>
      )}
      <div {...getRootProps()} className="col-span-full">
        <Separator className="w-full my-4" />
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center pb-2 col-span-full">
          <Icons.cloudUpload className="w-7 h-7" />
          <span
            className={cn(
              "text-sm text-center text-muted-foreground",
              isDragActive && "text-primary",
            )}
          >
            Drag and drop another image, or{" "}
            <span className="font-semibold underline cursor-pointer text-primary">
              Click here to upload.
            </span>
          </span>
        </div>
      </div>
    </Card>
  );
};

export default SingleImageField;
