"use client";

import { Video } from "@prisma/client";

import { useState } from "react";

import { addVideo, updateVideo } from "@/actions/videos";

export const useHandleVideoData = (video?: Video) => {
  const [videoData, setVideoData] = useState<Video>(video || ({} as Video));
  const [uploadingImage, setUploadingImage] = useState(false);
  const missingData = !(videoData.title && videoData.link);

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
        setVideoData({
          ...videoData,
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
    if (video?.id) {
      await updateVideo(video.id, {
        ...videoData,
        announcerId: videoData.presenterId,
      });
    } else {
      await addVideo({
        ...videoData,
        announcerId: videoData.presenterId,
      });
      setVideoData({} as Video);
    }
  };

  return {
    videoData,
    setVideoData,
    uploadingImage,
    handleUploadImage,
    missingData,
    onSubmit,
  };
};
