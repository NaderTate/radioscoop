"use client";

import { Post } from "@prisma/client";
import { useState } from "react";
import { createNewArticle, updateArticle } from "@/actions/articles";
export const useHandleArticleData = (article?: Post) => {
  const [articleData, setArticleData] = useState(article || ({} as Post));

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleUploadImage = async (images: File[]) => {
    const image = images[0];
    if (!image || !image.type.startsWith("image")) {
      alert("Please select a valid image");
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "articles");
    await fetch("/api/cloudinary", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setArticleData({
          ...articleData,
          image: data.Image,
        });
      })
      .catch((error) => {
        alert("error uploading images");
        console.error(error);
      });

    setUploadingImage(false);
  };

  const onSubmit = async () => {
    if (articleData.id) {
      await updateArticle(articleData.id, { ...articleData });
    } else {
      await createNewArticle({ ...articleData });
      setArticleData({} as Post);
    }
  };

  return {
    articleData,
    setArticleData,
    uploadingImage,
    handleUploadImage,
    onSubmit,
  };
};
