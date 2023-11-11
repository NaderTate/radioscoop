"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeEvent, useState } from "react";
import { AiOutlineCheck, AiOutlinePlusCircle } from "react-icons/ai";
import { LuChevronsUpDown } from "react-icons/lu";
import { addFeature, updateFeature } from "@/lib/_actions";
import { FiEdit } from "react-icons/fi";
import { DialogClose } from "@radix-ui/react-dialog";
import { Episode } from "@prisma/client";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import PresenterForm from "./PresenterForm";
import PostTypeForm from "./PostTypeForm";

function FeatureForm({
  feature,
  presenters,
  types,
}: {
  feature?: Episode;
  presenters: { id: string; name: string }[];
  types: { id: string; name: string }[];
}) {
  const ReverseAudioDriveLink = (updatedLink: string) => {
    const id = updatedLink.split("id=")[1];
    const originalUrl = `https://drive.google.com/file/d/${id}/view`;

    return originalUrl;
  };
  const [openPresenter, setOpenPresenter] = useState(false);
  const [openPreparer, setOpenPreparer] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [featureTitle, setFeatureTitle] = useState(feature?.featureTitle || "");
  const [preparerId, setPreparerId] = useState(feature?.preparedById || "");
  const [presenterId, setPresenterId] = useState(feature?.presenterId || "");
  const [link, setLink] = useState(
    feature?.link ? ReverseAudioDriveLink(feature?.link) : ""
  );
  const [image, setImage] = useState(feature?.img || "");
  const [typeId, setTypeId] = useState(feature?.typeId || "");
  const [uploading, setUploading] = useState(false);

  return (
    <Dialog>
      <DialogTrigger>
        {feature?.id ? (
          <FiEdit className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        ) : (
          <Button className="w-full">
            إضافة فيتشر <AiOutlinePlusCircle className="mr-2 h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {feature?.id ? "تعديل الفيتشر" : "اضافة فيتشر جديد"}
          </DialogTitle>
        </DialogHeader>
        <Input
          defaultValue={featureTitle}
          type="string"
          placeholder="العنوان"
          onChange={(e) => {
            setFeatureTitle(e.target.value);
          }}
        />
        <Input
          defaultValue={link}
          placeholder="الرابط (drive)"
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <h1>الصورة</h1>
        <Input
          type="file"
          onChange={async (e: ChangeEvent<HTMLInputElement>) => {
            const fileInput = e.target;
            if (!fileInput.files) {
              alert("No file was chosen");
              return;
            }
            if (!fileInput.files || fileInput.files.length === 0) {
              alert("Files list is empty");
              return;
            }
            const file = fileInput.files[0];
            /** File validation */
            if (!file.type.startsWith("image")) {
              alert("Please select a valide image");
              return;
            }

            let formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "features");
            setUploading(true);
            const res = await fetch(
              "https://api.cloudinary.com/v1_1//ddcjbeysn/image/upload",
              {
                method: "POST",
                body: formData,
              }
            );
            const data = await res.json();
            setUploading(false);
            setImage(data.secure_url);
          }}
          placeholder="الصورة"
        />
        {uploading && (
          <div className="flex justify-center">
            <BeatLoader color="#000" />
          </div>
        )}
        {image && (
          <Image
            className=" rounded-md"
            src={image}
            width={200}
            height={200}
            alt="img"
          />
        )}
        <Popover open={openPreparer} modal onOpenChange={setOpenPreparer}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openPreparer}
              className="w-[200px] justify-between"
            >
              {preparerId
                ? presenters.find((presenter) => presenter.id === preparerId)
                    ?.name
                : "اعداد..."}
              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" h-52 p-0">
            <Command>
              <CommandInput placeholder="ابحث عن مذيع..." />
              <CommandEmpty>لم يتم العثور على أي مذيع.</CommandEmpty>
              <CommandGroup className="overflow-auto">
                <div className="my-2">
                  <PresenterForm />
                </div>
                {presenters.map((presenter) => (
                  <CommandItem
                    key={presenter.id}
                    onSelect={() => {
                      setPreparerId(presenter.id);
                      setOpenPreparer(false);
                    }}
                  >
                    <AiOutlineCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        preparerId === presenter.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {presenter.name}{" "}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover open={openPresenter} modal onOpenChange={setOpenPresenter}>
          <PopoverTrigger className="mx-2" asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openPresenter}
              className="w-[200px] justify-between"
            >
              {presenterId
                ? presenters.find((presenter) => presenter.id === presenterId)
                    ?.name
                : "تقديم..."}
              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" h-52 p-0">
            <Command>
              <CommandInput placeholder="ابحث عن مذيع..." />
              <CommandEmpty>لم يتم العثور على أي مذيع.</CommandEmpty>
              <CommandGroup className="overflow-auto">
                <div className="my-2">
                  <PresenterForm />
                </div>

                {presenters.map((presenter) => (
                  <CommandItem
                    key={presenter.id}
                    onSelect={() => {
                      setPresenterId(presenter.id);
                      setOpenPresenter(false);
                    }}
                  >
                    <AiOutlineCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        presenterId === presenter.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {presenter.name}{" "}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover open={openType} modal onOpenChange={setOpenType}>
          <PopoverTrigger className="mx-2" asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openType}
              className="w-[200px] justify-between"
            >
              {typeId
                ? types.find((type) => type.id === typeId)?.name
                : "التصنيف..."}
              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" h-52 p-0">
            <Command>
              <CommandInput placeholder="ابحث عن تصنيف..." />
              <CommandEmpty>لم يتم العثور على أي تصنيف.</CommandEmpty>
              <CommandGroup className="overflow-auto">
                <div className="my-2">
                  <PostTypeForm For="feature" />
                </div>

                {types.map((type) => (
                  <CommandItem
                    key={type.id}
                    onSelect={() => {
                      setTypeId(type.id);
                      setOpenType(false);
                    }}
                  >
                    <AiOutlineCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        typeId === type.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {type.name}{" "}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <DialogClose disabled={!featureTitle || !link || !image}>
          <Button
            disabled={!featureTitle || !link || !image}
            className="block w-full"
            onClick={async () => {
              if (feature?.id) {
                await updateFeature(
                  feature.id,
                  featureTitle,
                  image,
                  link,
                  preparerId,
                  presenterId,
                  typeId
                );
              } else {
                await addFeature(
                  featureTitle,
                  image,
                  link,
                  preparerId,
                  presenterId,
                  typeId
                );
                setFeatureTitle("");
                setLink("");
                setImage("");
                setPreparerId("");
                setPresenterId("");
                setTypeId("");
              }
            }}
          >
            {feature?.id ? "تعديل" : "إضافة"}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default FeatureForm;
