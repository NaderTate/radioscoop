"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeEvent, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Video } from "@prisma/client";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { addVideo, updateVideo } from "@/lib/_actions";
import { FiEdit } from "react-icons/fi";
import AnnouncerDropodown from "@/components/dashboard/AnnouncerDropodown";
import { useHandleVideoData } from "../_hooks/useHandleVideoData";
import { Input, Spinner } from "@nextui-org/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Dropzone from "@/components/DropZone";

function VideoForm({
  announcers,
  video,
}: {
  announcers: { id: string; name: string }[];
  video?: Video;
}) {
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
      <DialogTrigger>
        {video?.id ? (
          <FiEdit size={20} className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        ) : (
          <div className="bg-primary rounded-md text-secondary-50 p-3 flex items-center">
            إضافة فيديو <AiOutlinePlusCircle className="mr-2 h-4 w-4" />
          </div>
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
          <DialogClose className="w-full" disabled={missingData}>
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
