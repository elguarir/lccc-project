"use client";
import { env } from "@/lib/env/client";
import React, { useState } from "react";
import axios from "axios";

type useUploadProps = {
  file: File;
  onUploadProgress?: (progress: number) => void;
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: any) => void;
};

const useUpload = () => {
  let baseUrl = `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

  const upload = async ({
    file,
    onUploadProgress,
    onUploadComplete,
    onUploadError,
  }: useUploadProps) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", env.NEXT_PUBLIC_CLOUDINARY_PRESET);
    try {
      const res = await axios.post(baseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          const progress = Math.round((data.loaded * 100) / (data.total ?? 1));
          if (onUploadProgress) onUploadProgress(progress);
        },
      });
      if (onUploadComplete) onUploadComplete(res.data.secure_url);
      return res.data.secure_url as string;
    } catch (error) {
      if (onUploadError) onUploadError(error);
    }
  };

  return { upload };
};

export default useUpload;
