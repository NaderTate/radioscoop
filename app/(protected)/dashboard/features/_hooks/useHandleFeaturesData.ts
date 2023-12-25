"use client";

import { ReverseAudioDriveLink } from "@/lib/utils";
import { useState } from "react";

import { createFeature, updateFeature } from "@/actions/features";
export const useHanldeFeaturesData = (feature?: {
  id: string;
  featureTitle: string | null;
  preparedById: string | null;
  presenterId: string | null;
  link: string;
  img: string | null;
  typeId: string | null;
  embedLink: string | null;
}) => {
  const [featureData, setFeatureData] = useState(
    feature
      ? {
          ...feature,
          link: feature?.link ? ReverseAudioDriveLink(feature.link) : "",
        }
      : {
          featureTitle: "",
          preparedById: "",
          presenterId: "",
          link: "",
          img: "",
          typeId: "",
          embedLink: "",
        }
  );
  const missingData = !(featureData.featureTitle && featureData.img);
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
    formData.append("upload_preset", "features");
    await fetch("/api/cloudinary", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setFeatureData({
          ...featureData,
          img: data.Image,
        });
      })
      .catch((error) => {
        alert("error uploading images");
        console.error(error);
      });

    setUploadingImage(false);
  };

  const onSubmit = async () => {
    if (feature?.id) {
      await updateFeature(feature.id, { ...featureData });
    } else {
      await createFeature({ ...featureData });
      setFeatureData({
        featureTitle: "",
        preparedById: "",
        presenterId: "",
        link: "",
        img: "",
        typeId: "",
        embedLink: "",
      });
    }
  };

  return {
    featureData,
    setFeatureData,
    uploadingImage,
    handleUploadImage,
    onSubmit,
    missingData,
  };
};
