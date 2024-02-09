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
import Dropzone from "./DropZone";
import { Button } from "@/components/ui/button";
import AnnouncerDropodown from "./AnnouncerDropodown";
import { useHandleProgramData } from "@/app/(protected)/dashboard/programs/_hooks/useHandleProgramData";

import { FiEdit } from "react-icons/fi";

type Prop = {
  presenters: { id: string; name: string }[];
  program?: {
    id: string;
    name: string;
    img: string;
    authorId: string[] | null | undefined;
  };
};

function ProgramForm({ presenters, program }: Prop) {
  const {
    programData,
    setProgramData,
    handleUploadImage,
    uploadingImage,
    onSubmit,
    missingData,
  } = useHandleProgramData(program);
  return (
    <Dialog>
      <DialogTrigger>
        {program?.id ? (
          <FiEdit className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        ) : (
          <div className="bg-primary rounded-md text-secondary-50 p-3 flex items-center">
            إضافة برنامج
          </div>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{program?.id ? "تعديل" : "اضافة برنامج"} </DialogTitle>
        </DialogHeader>
        <Input
          variant="bordered"
          defaultValue={program?.name}
          label="الاسم"
          onValueChange={(e) => {
            setProgramData({ ...programData, name: e });
          }}
        />
        <h1>الصورة</h1>
        <Dropzone handleImages={handleUploadImage} />
        {uploadingImage && <Spinner />}
        {programData.img && (
          <Image
            className=" rounded-md"
            src={programData.img}
            width={200}
            height={200}
            alt="img"
          />
        )}
        {/* <AnnouncerDropodown
          announcerIDs={programData.authorId}
          announcers={presenters}
          onSelect={(id) => {
            setProgramData({ ...programData, authorId: id });
          }}
        /> */}
        <DialogClose className="w-full" disabled={missingData}>
          <Button disabled={missingData} className="w-full" onClick={onSubmit}>
            {program?.id ? "تعديل" : "إضافة"}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default ProgramForm;
