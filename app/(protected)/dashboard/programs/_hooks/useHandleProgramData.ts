"use client";

import { useState } from "react";
import { createProgram, updateProgram } from "@/actions/program";

export const useHandleProgramData = (program?: {
  id: string;
  img: string;
  name: string;
  authorId: string | null | undefined;
}) => {
  const [programData, setProgramData] = useState(
    program || {
      img: "",
      name: "",
      authorId: "",
    }
  );

  const [uploadingImage, setUploadingImage] = useState(false);
  const missingData = !(programData.img && programData.name);

  const handleUploadImage = async (images: File[]) => {
    const image = images[0];
    if (!image || !image.type.startsWith("image")) {
      alert("Please select a valid image");
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "programs");
    await fetch("/api/cloudinary", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setProgramData({ ...programData, img: data.Image });
      })
      .catch((error) => {
        alert("error uploading images");
        console.error(error);
      });

    setUploadingImage(false);
  };

  const onSubmit = async () => {
    if (program?.id) {
      await updateProgram(program.id, programData);
    } else {
      await createProgram(programData);
      setProgramData({
        img: "",
        name: "",
        authorId: "",
      });
    }
  };

  return {
    programData,
    setProgramData,
    handleUploadImage,
    uploadingImage,
    missingData,
    onSubmit,
  };
};
