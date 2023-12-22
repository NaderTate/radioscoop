"use client";

import { useEffect } from "react";
import { Input } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { ReactSortable } from "react-sortablejs";

import PosterCard from "./PosterCard";
import Dropzone from "@/components/dashboard/DropZone";

import { RxCross2 } from "react-icons/rx";
import { useHandleDayData } from "../_hooks/useHandleDayData";

type Props = {
  name: string;
  images: { id: string; link: string }[];
  updateData: (name: string, images: { id: string; link: string }[]) => void;
  removeDay: (id: string) => void;
};

function Day({ updateData, removeDay, name, images }: Props) {
  const { Images, deleteImg, setImages, uploading, handleUploadImages } =
    useHandleDayData(images);
  useEffect(() => {
    updateData(name, Images);
  }, [Images]);

  return (
    <>
      <div className="flex justify-center ">
        <Input
          defaultValue={name}
          onValueChange={(e) => {
            updateData(e, Images);
          }}
          variant="bordered"
          label="day"
          className="w-fit"
        />
      </div>
      <div className="border-2 border-divider rounded-md p-5 relative">
        <RxCross2
          onClick={removeDay}
          className="w-7 h-7 absolute right-1 top-1 border-2 border-divider rounded-full p-1 bg-background cursor-pointer z-[2]"
        />
        <div dir="ltr">
          <div
            className={`flex flex-wrap items-center ${
              images.length > 0 ? "justify-start" : "justify-center"
            } gap-5`}
          >
            <ReactSortable
              animation={150}
              list={Images}
              setList={setImages}
              className="flex flex-wrap gap-5 justify-start items-center mx-2"
            >
              {Images.map((image: { id: string; link: string }) => (
                <PosterCard
                  key={image.id}
                  img={image.link}
                  deleteImage={() => {
                    deleteImg(image.id);
                  }}
                />
              ))}
            </ReactSortable>
            {uploading && <Spinner className="m-auto" />}
            <Dropzone handleImages={handleUploadImages} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Day;
