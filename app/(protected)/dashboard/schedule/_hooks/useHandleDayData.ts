"use client";

import { useState } from "react";

export const useHandleDayData = (images: { id: string; link: string }[]) => {
  const [Images, setImages] = useState<{ id: string; link: string }[]>(images);
  const [uploading, setUploading] = useState(false);

  const deleteImg = (id: string) => {
    setImages((current) => current.filter((img) => img.id != id));
  };

  const handleUploadImages = async (file: File[]) => {
    setUploading(true);
    for (let i = 0; i < file.length; i++) {
      const formData = new FormData();
      formData.append("file", file[i]);
      formData.append("upload_preset", "schedule");
      const res = await fetch("/api/cloudinary", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImages((current) => [...current, { id: data.id, link: data.Image }]);
    }
    setUploading(false);
  };
  return {
    Images,
    setImages,
    uploading,
    deleteImg,
    handleUploadImages,
  };
};
