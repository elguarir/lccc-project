import { createImageUrl } from "@/lib/helpers/CreateImageUrl";
import { useState, useCallback } from "react";

const uploadFile = async (
  file: File,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>,
  setKey: React.Dispatch<React.SetStateAction<string | undefined>>,
  setUrl: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
  const getUploadUrl = async (file: File) => {
    const res = await fetch("/api/upload/generate", {
      method: "POST",
      body: JSON.stringify({
        filename: file.name,
        filetype: file.type,
      }),
    });
    const data = await res.json();
    return data;
  };

  const { url, key } = await getUploadUrl(file);

  const xhr = new XMLHttpRequest();
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
    const url = createImageUrl(key);
    setUrl(url);
  };

  xhr.send(file);
};

/**
 * Custom hook for uploading a single file and tracking its upload state.
 * @returns An object containing `uploadFile` function and the current upload state.
 */
export const useUpload = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [key, setKey] = useState<string | undefined>(undefined);
  const [url, setUrl] = useState<string | undefined>(undefined);

  const uploadFileCallback = useCallback(
    (file: File) => {
      setProgress(0);
      setIsUploaded(false);
      setKey(undefined);
      setUrl(undefined);
      uploadFile(file, setProgress, setIsUploaded, setKey, setUrl);
    },
    [setProgress, setIsUploaded, setKey, setUrl],
  );

  return {
    progress,
    isUploaded,
    key,
    url,
    uploadFile: uploadFileCallback,
  };
};
