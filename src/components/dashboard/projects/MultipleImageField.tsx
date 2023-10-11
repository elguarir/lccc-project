import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUpload } from "@/hooks/use-multiple-upload";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  images: string[];
  setImages: (value: string[]) => void;
};

interface FileState {
  file: File;
  progress: number;
  preview?: string;
}

const MultipleImageField = ({ images, setImages }: Props) => {
  const [files, setFiles] = useState<FileState[]>([]);

  const { startUpload, removeUpload } = useUpload({
    onUploadComplete: (file, url) => {
      // @ts-ignore
      setFiles((prevStates) => prevStates.filter((v) => v.file !== file));
      setImages([...images, url]);
      removeUpload(file);
    },
    onProgress: (file, progress) => {
      updateLocalFileState(file, progress);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        setFiles((prevStates) => [
          ...prevStates,
          { file, progress: 0, preview: URL.createObjectURL(file) },
        ]);
        startUpload(file);
      });
    },
    [startUpload],
  );


  const updateLocalFileState = (file: File, progress: number) => {
    setFiles((prevStates) => {
      return prevStates.map((state) =>
        state.file === file ? { ...state, progress } : state,
      );
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  if (images.length === 0 && files.length === 0) {
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
            Drag and drop more images here, or <br />
            <span className="font-semibold underline cursor-pointer text-primary">
              Click here to upload.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="grid w-full grid-cols-2 gap-4 p-4 border-2 border-dashed md:grid-cols-3">
      {images.map((url) => (
        <div
          key={url}
          className="relative overflow-hidden rounded-lg aspect-video"
        >
          <Button
            className="absolute w-5 h-5 p-0.5 rounded-[5px] top-3 right-2"
            type="button"
            size={"xs"}
            variant={"secondary"}
            onClick={() => {
              setImages(images.filter((v) => v !== url));
            }}
          >
            <X className="w-3 h-3" strokeWidth={2} />
          </Button>
          <img className="object-cover w-full h-full" src={url} />
        </div>
      ))}

      {files.map((fileState) => (
        <div
          key={fileState.file.name}
          className="relative overflow-hidden rounded-lg aspect-video"
        >
          {fileState.progress !== 100 && (
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/60">
              <span className="text-lg font-medium font-display text-background">
                {fileState.progress}%
              </span>
            </div>
          )}

          <Button
            className="absolute w-5 h-5 p-0.5 rounded-[5px] top-3 right-2"
            type="button"
            size={"xs"}
            variant={"secondary"}
            onClick={() => {
              setImages(images.filter((v) => v !== fileState.preview));
            }}
          >
            <X className="w-3 h-3" strokeWidth={2} />
          </Button>
          <img className="object-cover w-full h-full" src={fileState.preview} />
        </div>
      ))}
      <div {...getRootProps()} className="col-span-full">
        <Separator className="w-full my-4" />
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center pb-2 col-span-full">
          <Icons.cloudUpload className="w-7 h-7" />
          <span
            className={cn(
              "text-sm text-muted-foreground",
              isDragActive && "text-primary",
            )}
          >
            Drag and drop more images here, or{" "}
            <span className="font-semibold underline cursor-pointer text-primary">
              Click here to upload.
            </span>
          </span>
        </div>
      </div>
    </Card>
  );
};

export default MultipleImageField;

const ImageCard = ({
  url,
  onRemove,
}: {
  url: string;
  onRemove: () => void;
}) => {
  return (
    <div className="relative overflow-hidden rounded-lg aspect-video">
      <Button
        className="absolute w-5 h-5 p-0.5 rounded-[5px] top-3 right-2"
        type="button"
        size={"xs"}
        variant={"secondary"}
        onClick={onRemove}
      >
        <X className="w-3 h-3" strokeWidth={2} />
      </Button>
      <img className="object-cover w-full h-full" src={url} />
    </div>
  );
};
