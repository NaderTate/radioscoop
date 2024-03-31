"use client";

import { useState } from "react";

import { addAnnouncer, updateAnnouncer } from "@/actions/announcers";

export const useHandleAnnouncerData = (announcer?: {
  id: string;
  name: string;
  img: string | null;
}) => {
  const [announcerData, setAnnouncerData] = useState({
    name: announcer?.name || "",
    img: announcer?.img || "",
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleUploadImage = async (images: File[]) => {
    const image = images[0];
    if (!image || !image.type.startsWith("image")) {
      alert("Please select a valid image");
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("source", image);
    const res = await fetch("/api/lensdump", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setAnnouncerData({
          ...announcerData,
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
    if (announcer) {
      await updateAnnouncer(announcer.id, announcerData);
    } else {
      await addAnnouncer(announcerData);
      setAnnouncerData({
        name: "",
        img: "",
      });
    }
  };

  return {
    announcerData,
    setAnnouncerData,
    uploadingImage,
    handleUploadImage,
    onSubmit,
  };
};
