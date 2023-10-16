"use client";
import { Button } from "@/components/ui/button";
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
import { AiOutlineCheck } from "react-icons/ai";
import { LuChevronsUpDown } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { DialogClose } from "@radix-ui/react-dialog";
import { Category } from "@prisma/client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { createProgram, updateProgram } from "@/lib/_actions";
import PresenterForm from "./PresenterForm";
function ProgramForm({
  presenters,
  program,
}: {
  presenters: { id: string; name: string }[];
  program?: Category;
}) {
  const [name, setName] = useState(program?.name || "");
  const [img, setImg] = useState(program?.img || "");
  const [presenterId, setPresenterId] = useState(program?.authorId || "");
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <Dialog>
      <DialogTrigger>
        {program?.id ? (
          <FiEdit className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        ) : (
          <Button className="w-full">إضافة برنامج</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{program?.id ? "تعديل" : "اضافة برنامج"} </DialogTitle>
        </DialogHeader>
        <Input
          defaultValue={name}
          placeholder="الاسم"
          onChange={(e) => {
            setName(e.target.value);
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
            formData.append("upload_preset", "programs");
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
            setImg(data.secure_url);
          }}
          placeholder="الصورة"
        />
        {uploading && (
          <div className="flex justify-center">
            <BeatLoader color="#000" />
          </div>
        )}
        {img && (
          <Image
            className=" rounded-md"
            src={img}
            width={200}
            height={200}
            alt="img"
          />
        )}
        <Popover open={open} modal onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {presenterId
                ? presenters.find((presenter) => presenter.id === presenterId)
                    ?.name
                : "المذيع..."}
              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" h-52 p-0">
            <Command>
              <CommandInput placeholder="ابحث عن برنامج..." />
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
                      setOpen(false);
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
        <DialogClose className="w-full">
          {program?.id ? (
            <Button
              onClick={async () => {
                await updateProgram(program.id, name, img, presenterId);
              }}
              className="w-full"
            >
              تعديل
            </Button>
          ) : (
            <Button
              onClick={async () => {
                await createProgram(name, img, presenterId);
                setName("");
                setImg("");
                setPresenterId("");
              }}
              className="w-full"
            >
              اضافة
            </Button>
          )}
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default ProgramForm;
