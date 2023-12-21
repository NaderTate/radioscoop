"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FiEdit } from "react-icons/fi";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { useHandleAnnouncerData } from "../_hooks/useHandleAnnouncerData";
import { Input, Spinner } from "@nextui-org/react";
import Dropzone from "@/components/dashboard/DropZone";

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
      <DialogTrigger>
        {announcer?.id ? (
          <FiEdit className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        ) : (
          <div className="bg-primary rounded-md text-secondary-50 p-3 flex items-center">
            إضافة مذيع <AiOutlinePlusCircle className="mr-2 h-4 w-4" />
          </div>
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
            <DialogClose disabled={!announcerData.name} className="w-full">
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
