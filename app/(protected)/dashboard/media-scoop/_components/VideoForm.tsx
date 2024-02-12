"use client";

import { Video } from "@prisma/client";

import Image from "next/image";
import { Input, Spinner } from "@nextui-org/react";
import { DialogClose } from "@radix-ui/react-dialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/dashboard/DropZone";
import AnnouncerDropodown from "@/components/dashboard/AnnouncerDropodown";

import { FiEdit } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { useHandleVideoData } from "../_hooks/useHandleVideoData";

type Props = {
  announcers: { id: string; name: string }[];
  video?: Video;
};

function VideoForm({ announcers, video }: Props) {
  const {
    videoData,
    setVideoData,
    handleUploadImage,
    missingData,
    uploadingImage,
    onSubmit,
  } = useHandleVideoData(video);
  return (
    <Dialog>
      <DialogTrigger asChild>
        {video?.id ? (
          <FiEdit
            size={20}
            className="mr-2 h-4 w-4 shrink-0 opacity-50 cursor-pointer"
          />
        ) : (
          <Button size={"lg"}>
            إضافة فيديو <AiOutlinePlusCircle className="mr-2 h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{video?.id ? "تعديل" : "اضافة فيديو"} </DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2">
            <Input
              label="العنوان"
              variant="bordered"
              defaultValue={videoData?.title}
              onValueChange={(e) => {
                setVideoData({ ...videoData, title: e });
              }}
            />
            <h1>الصورة</h1>
            <Dropzone handleImages={handleUploadImage} maxFiles={1} />
            {uploadingImage && <Spinner />}
            {videoData.image && (
              <Image
                className=" rounded-md"
                src={videoData.image}
                width={200}
                height={200}
                alt="img"
              />
            )}
            <Input
              label="الرابط"
              variant="bordered"
              defaultValue={videoData?.link}
              onValueChange={(e) => {
                setVideoData({ ...videoData, link: e });
              }}
            />
            <AnnouncerDropodown
              announcers={announcers}
              announcerId={videoData?.presenterId}
              onSelect={(id) => {
                setVideoData({ ...videoData, presenterId: id });
              }}
            />
          </div>
          <DialogClose asChild className="w-full" disabled={missingData}>
            <Button
              disabled={missingData}
              className="w-full"
              onClick={onSubmit}
            >
              {video?.id ? "تعديل" : "إضافة"}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default VideoForm;
