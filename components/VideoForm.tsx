"use client";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ChangeEvent, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Video } from "@prisma/client";
import PresenterForm from "./PresenterForm";
import { LuChevronsUpDown } from "react-icons/lu";
import { AiOutlineCheck } from "react-icons/ai";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { addVideo, updateVideo } from "@/lib/_actions";
import { FiEdit } from "react-icons/fi";

function VideoForm({
  presenters,
  video,
}: {
  presenters: { id: string; name: string }[];
  video?: Video;
}) {
  const [title, setTitle] = useState(video?.title || "");
  const [link, setLink] = useState(video?.link || "");
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(video?.image || "");
  const [uploading, setUploading] = useState(false);
  const [presenterId, setPresenterId] = useState(video?.presenterId || "");
  return (
    <Dialog>
      <DialogTrigger>
        {video?.id ? (
          <FiEdit size={20} className="m-auto" />
        ) : (
          <Button className="w-full">إضافة فيديو</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{video?.id ? "تعديل" : "اضافة فيديو"} </DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2">
            <Input
              placeholder="العنوان"
              defaultValue={title}
              onChange={async (e) => setTitle(e.target.value)}
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
                formData.append("upload_preset", "videos");
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
            <Input
              placeholder="الرابط"
              defaultValue={link}
              onChange={async (e) => setLink(e.target.value)}
            />
            <Popover open={open} modal onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {presenterId
                    ? presenters.find(
                        (presenter) => presenter.id === presenterId
                      )?.name
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
          </div>
          <DialogClose className="w-full" disabled={!title || !image}>
            <Button
              disabled={!title || !image}
              className="w-full"
              onClick={async () => {
                if (video?.id) {
                  await updateVideo(video.id, title, link, image, presenterId);
                } else {
                  await addVideo(title, link, image, presenterId);
                }
              }}
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
