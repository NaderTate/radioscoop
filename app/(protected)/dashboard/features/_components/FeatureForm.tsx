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
import Category from "./dropdowns/Category";
import Preparer from "./dropdowns/Preparer";
import Presenter from "./dropdowns/Presenter";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/dashboard/DropZone";

import { FiEdit } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { useHanldeFeaturesData } from "../_hooks/useHandleFeaturesData";

type Props = {
  feature?: {
    id: string;
    featureTitle: string | null;
    preparedById: string | null;
    presenterId: string | null;
    link: string;
    img: string | null;
    typeId: string | null;
    embedLink: string | null;
  };
  presenters: { id: string; name: string }[];
  types: { id: string; name: string }[];
};

function FeatureForm({ feature, presenters, types }: Props) {
  const {
    featureData,
    setFeatureData,
    handleUploadImage,
    uploadingImage,
    missingData,
    onSubmit,
  } = useHanldeFeaturesData(feature);

  return (
    <Dialog>
      <DialogTrigger>
        {feature?.id ? (
          <FiEdit className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        ) : (
          <div className="bg-primary rounded-md text-secondary-50 p-3 flex items-center">
            إضافة فيتشر <AiOutlinePlusCircle className="mr-2 h-4 w-4" />
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="overflow-auto h-full max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            {feature?.id ? "تعديل الفيتشر" : "اضافة فيتشر جديد"}
          </DialogTitle>
        </DialogHeader>
        <Input
          variant="bordered"
          defaultValue={featureData.featureTitle || ""}
          label="العنوان"
          onValueChange={(e) => {
            setFeatureData({ ...featureData, featureTitle: e });
          }}
        />
        <Input
          variant="bordered"
          defaultValue={featureData.link}
          label="الرابط (drive)"
          onValueChange={(e) => {
            setFeatureData({ ...featureData, link: e });
          }}
        />
        <Input
          variant="bordered"
          defaultValue={featureData.embedLink || ""}
          label=" (embed link) رابط الفيديو  "
          onValueChange={(e) => {
            setFeatureData({ ...featureData, embedLink: e });
          }}
        />
        <h1>الصورة</h1>
        <Dropzone handleImages={handleUploadImage} maxFiles={1} />
        {uploadingImage && <Spinner />}
        {featureData.img && (
          <Image
            className=" rounded-md"
            src={featureData.img}
            width={200}
            height={200}
            alt="img"
          />
        )}
        <Preparer
          preparerId={featureData.preparedById}
          presenters={presenters}
          onSelect={(e) => {
            setFeatureData({ ...featureData, preparedById: e });
          }}
        />
        <Presenter
          presenterId={featureData.presenterId}
          presenters={presenters}
          onSelect={(e) => {
            setFeatureData({ ...featureData, presenterId: e });
          }}
        />
        <Category
          typeId={featureData.typeId}
          types={types}
          setTypeId={(e) => {
            setFeatureData({ ...featureData, typeId: e });
          }}
        />
        <DialogClose disabled={missingData}>
          <Button
            disabled={missingData}
            className="block w-full"
            onClick={onSubmit}
          >
            {feature?.id ? "تعديل" : "إضافة"}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default FeatureForm;
