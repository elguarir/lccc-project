import { createImageUrl } from "@/lib/helpers/CreateImageUrl";
import { useState, useCallback } from "react";

/**
 * Custom hook for uploading a single file and tracking its upload state.
 * @param {Function} onUploadComplete - Callback function to execute when the upload is complete.
 * @param {Function} onError - Callback function to execute when an error occurs during the upload.
 * @returns An object containing `uploadFile` function and the current upload state.
 */

interface UploadHookProps {
  onUploadStarted?: () => void;
  onUploadComplete?: (url: string) => void;
  onError?: (error: string) => void;
}

export const useUpload = (props: UploadHookProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [key, setKey] = useState<string | undefined>(undefined);
  const [url, setUrl] = useState<string | undefined>(undefined);

  const { onUploadStarted, onUploadComplete, onError } = props;

  const uploadFile = useCallback(
    async (file: File) => {
      setProgress(0);
      setIsUploaded(false);
      setKey(undefined);
      setUrl(undefined);

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
          console.error("Error generating upload URL:", error);
          if (onError) {
            onError(error as string); // Execute the onError callback
          }
          return null;
        }
      };

      const uploadToS3 = async (url: string, file: File) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("loadstart", () => {
          if (onUploadStarted) {
            onUploadStarted();
          }
        });

        xhr.open("PUT", url, true);

        xhr.upload.onprogress = (progressEvent) => {
          if (progressEvent.lengthComputable) {
            const uploaded = progressEvent.loaded;
            const total = file.size;
            const newProgress = Math.round((uploaded / total) * 100);
            setProgress(newProgress);
          }
        };

        xhr.onload = () => {
          setIsUploaded(true);
          setKey(key);
          const imageUrl = createImageUrl(key);
          setUrl(imageUrl);
          if (onUploadComplete) {
            onUploadComplete(imageUrl); // Execute the onUploadComplete callback with the final URL
          }

          // Reset the progress bar
          setTimeout(() => {
            setProgress(0);
          }, 1000);
        };

        xhr.onerror = () => {
          console.error("Error uploading file to S3");
          if (onError) {
            onError("Error uploading file to S3"); // Execute the onError callback
          }
        };

        xhr.send(file);
      };

      const { url, key } = await getUploadUrl(file);
      if (url) {
        uploadToS3(url, file);
      }
    },
    [onUploadComplete, onError],
  );

  return {
    progress,
    isUploaded,
    key,
    url,
    uploadFile,
  };
};
