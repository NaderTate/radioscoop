"use client";
import { Author } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { addAuthor, updateAuthor } from "@/lib/_actions";
interface Author_ extends Author {
  Categories: { id: string }[];
}
function PresenterForm({ presenter }: { presenter?: Author_ }) {
  const [name, setName] = useState(presenter?.name || "");
  const [img, setImg] = useState(presenter?.img || "");
  const [uploading, setUploading] = useState(false);
  return (
    <Dialog>
      <DialogTrigger>
        {presenter?.id ? (
          <FiEdit className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        ) : (
          <Button className="w-full">إضافة مذيع</Button>
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
                placeholder="الاسم"
                defaultValue={name}
                onChange={async (e) => setName(e.target.value)}
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
                  formData.append("upload_preset", "presenters");
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
            </div>
            {uploading && (
              <div className="flex justify-center">
                <BeatLoader color="#000" />
              </div>
            )}
            {img && (
              <Image
                className="m-auto rounded-md"
                src={img}
                width={200}
                height={200}
                alt="img"
              />
            )}
            <DialogClose className="w-full">
              {presenter?.id ? (
                <Button
                  disabled={!name}
                  onClick={async () => {
                    const res = await updateAuthor(presenter.id, name, img);
                    if (res.error) {
                      alert(res.error);
                    }
                  }}
                  className="w-full"
                >
                  تعديل
                </Button>
              ) : (
                <Button
                  disabled={!name}
                  onClick={async () => {
                    const res = await addAuthor(name, img);
                    if (res.error) {
                      alert(res.error);
                    }
                    setName("");
                    setImg("");
                  }}
                  className="w-full"
                >
                  اضافة
                </Button>
              )}
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PresenterForm;
