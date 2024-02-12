"use client";

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

import { FiEdit } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { useHandleAnnouncerData } from "../_hooks/useHandleAnnouncerData";

type Props = {
  announcer?: {
    id: string;
    name: string;
    img: string | null;
  };
};

function PresenterForm({ announcer }: Props) {
  const {
    announcerData,
    setAnnouncerData,
    uploadingImage,
    onSubmit,
    handleUploadImage,
  } = useHandleAnnouncerData(announcer);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {announcer?.id ? (
          <FiEdit className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        ) : (
          <Button size={"lg"}>
            إضافة مذيع <AiOutlinePlusCircle className="mr-2 h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>اضافة مذيع جديد</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-5">
            <div className="space-y-2">
              <Input
                label="الاسم"
                variant="bordered"
                defaultValue={announcer?.name}
                onValueChange={(e) => {
                  setAnnouncerData({ ...announcerData, name: e });
                }}
              />
              <h1>الصورة</h1>
              <Dropzone handleImages={handleUploadImage} maxFiles={1} />
            </div>
            {uploadingImage && <Spinner />}
            {announcerData.img && (
              <Image
                className="rounded-md"
                src={announcerData.img}
                width={200}
                height={200}
                alt="img"
              />
            )}
            <DialogClose
              asChild
              disabled={!announcerData.name}
              className="w-full"
            >
              <Button
                disabled={!announcerData.name}
                color="primary"
                className="w-full"
                onClick={onSubmit}
              >
                {announcer?.id ? "تعديل" : "إضافة"}
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PresenterForm;
