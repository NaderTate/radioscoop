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
      <DialogTrigger asChild>
        {program?.id ? (
          <FiEdit className="mr-2 h-4 w-4 shrink-0 opacity-50 cursor-pointer" />
        ) : (
          <Button size={"lg"}>إضافة برنامج</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{program?.id ? "تعديل" : "اضافة برنامج"} </DialogTitle>
        </DialogHeader>
        <Input
          variant="bordered"
          value={programData?.name}
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
        <AnnouncerDropodown
          multi
          announcerIDs={programData.authorId}
          announcers={presenters}
          onSelectMulti={(id) => {
            setProgramData({ ...programData, authorId: id });
          }}
        />
        <DialogClose asChild className="w-full" disabled={missingData}>
          <Button disabled={missingData} className="w-full" onClick={onSubmit}>
            {program?.id ? "تعديل" : "إضافة"}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default ProgramForm;
