"use client";

import { useState } from "react";
import { createPromo, updatePromo } from "@/actions/promos";

export const useHandlePromoData = (promo?: {
  id?: string;
  link: string;
  img?: string;
  categoryId: string;
  presenterIds: string[];
}) => {
  const [promoData, setPromoData] = useState<{
    link: string;
    img?: string;
    categoryId: string;
    presenterIds: string[];
  }>(
    promo
      ? { ...promo }
      : { link: "", img: undefined, categoryId: "", presenterIds: [] }
  );

  const [uploadingImage, setUploadingImage] = useState(false);
  // Required fields: link, image, and categoryId.
  const missingData = !(promoData.link && promoData.categoryId);

  const handleUploadImage = async (images: File[]) => {
    const image = images[0];
    if (!image || !image.type.startsWith("image")) {
      alert("Please select a valid image");
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("source", image);
    await fetch("/api/lensdump", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setPromoData({ ...promoData, img: data.Image });
      })
      .catch((error) => {
        alert("Error uploading image");
        console.error(error);
      });
    setUploadingImage(false);
  };

  const onSubmit = async () => {
    if (promo?.id) {
      await updatePromo(promo.id, promoData);
    } else {
      await createPromo(promoData);
      setPromoData({
        link: "",
        img: "",
        categoryId: "",
        presenterIds: [],
      });
    }
  };

  return {
    promoData,
    setPromoData,
    handleUploadImage,
    uploadingImage,
    missingData,
    onSubmit,
  };
};
