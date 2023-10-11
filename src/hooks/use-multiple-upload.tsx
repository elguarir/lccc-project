import { createImageUrl } from "@/lib/helpers/CreateImageUrl";
import { useState, useCallback } from "react";

interface UploadState {
  progress: number;
  isUploaded: boolean;
  key: string | undefined;
  url: string | undefined;
}

interface UploadHookProps {
  onUploadStarted?: (file: File) => void;
  onUploadComplete?: (file: File, url: string) => void;
  onProgress?: (file: File, progress: number) => void;
  onError?: (file: File, error: string) => void;
}

export const useUpload = (props: UploadHookProps) => {
  const [uploadStates, setUploadStates] = useState<UploadState[]>([]);

  const startUpload = (file: File) => {
    if (!file) return;

    const uploadState: UploadState = {
      progress: 0,
      isUploaded: false,
      key: undefined,
      url: undefined,
    };

    setUploadStates((prevStates) => [...prevStates, uploadState]);

    const { onUploadStarted, onUploadComplete, onProgress, onError } = props;

    const getUploadUrl = async (file: File) => {
      try {
        const res = await fetch("/api/upload/generate", {
          method: "POST",
          body: JSON.stringify({
            filename: file.name,
            filetype: file.type,
          }),
        });
        if (!res.ok) {
          throw new Error("Failed to generate upload URL");
        }
        const data = await res.json();
        return data;
      } catch (error) {
        if (onError) {
          onError(file, "Error generating upload URL: " + error);
        }
        return null;
      }
    };

    const uploadToS3 = async (url: string, file: File) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("loadstart", () => {
        if (onUploadStarted) {
          onUploadStarted(file);
        }
      });

      xhr.open("PUT", url, true);

      xhr.upload.onprogress = (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const uploaded = progressEvent.loaded;
          const total = file.size;
          const newProgress = Math.round((uploaded / total) * 100);

          const updatedStates = uploadStates.map((state, index) =>
            index === uploadStates.length - 1
              ? { ...state, progress: newProgress }
              : state
          );

          setUploadStates(updatedStates);

          if (onProgress) {
            onProgress(file, newProgress);
          }
        }
      };

      xhr.onload = () => {
        const updatedStates = uploadStates.map((state, index) =>
          index === uploadStates.length - 1
            ? { ...state, isUploaded: true, key: state.key }
            : state
        );

        setUploadStates(updatedStates);

        const imageUrl = createImageUrl(uploadState.key!);
        if (onUploadComplete) {
          onUploadComplete(file, imageUrl);
        }
      };

      xhr.onerror = () => {
        if (onError) {
          onError(file, "Error uploading file to S3");
        }
      };

      xhr.send(file);
    };

    getUploadUrl(file)
      .then((data) => {
        if (data && data.url) {
          uploadState.key = data.key;
          uploadToS3(data.url, file);
        }
      })
      .catch((error) => {
        if (onError) {
          onError(file, "Error uploading file: " + error);
        }
      });
  };

  const removeUpload = (file: File) => {
    const updatedStates = uploadStates.filter((state) => state.progress !== 100);
    setUploadStates(updatedStates);
  };

  return {
    uploadStates,
    startUpload,
    removeUpload,
  };
};
