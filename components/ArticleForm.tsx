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
import { Post } from "@prisma/client";
import { FiEdit } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import { LuChevronsUpDown } from "react-icons/lu";
import PresenterForm from "./PresenterForm";
import { AiOutlineCheck } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { addArticle, updateArticle } from "@/lib/_actions";
import PostTypeForm from "./PostTypeForm";
import PostMonthForm from "./PostMonthForm";
function ArticleForm({
  presenters,
  article,
  types,
  postMonths,
  years,
}: {
  presenters: { id: string; name: string }[];
  article?: Post;
  types: { id: string; name: string }[];
  postMonths: { id: string; name: string; year: { year: string } }[];
  years: { id: string; year: string }[];
}) {
  const [title, setTitle] = useState(article?.title || "");
  const [image, setImage] = useState(article?.image || "");
  const [content, setContent] = useState(article?.content || "");
  const [presenterId, setPresenterId] = useState(article?.presenterId || "");
  const [typeId, setTypeId] = useState(article?.typeId || "");
  const [monthId, setMonthId] = useState(article?.postMonthId || "");
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);
  return (
    <Dialog>
      <DialogTrigger>
        {article?.id ? (
          <FiEdit size={20} className="m-auto" />
        ) : (
          <Button className="w-full">إضافة مقالة</Button>
        )}
      </DialogTrigger>
      <DialogContent className="overflow-auto h-full max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{article?.id ? "تعديل" : "اضافة مقالة"} </DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2">
            <Input
              placeholder="العنوان"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
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
                width={150}
                height={150}
                alt="img"
              />
            )}
            <Textarea
              rows={10}
              placeholder="المحتوى"
              defaultValue={content}
              onChange={(e) => setContent(e.target.value)}
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
                      <PostTypeForm For="post" />
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
            <Popover open={openMonth} modal onOpenChange={setOpenMonth}>
              <PopoverTrigger className="mx-2" asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openMonth}
                  className="w-[200px] justify-between"
                >
                  {monthId
                    ? postMonths.find((month) => month.id === monthId)?.name
                    : "الشهر..."}
                  <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" h-52 p-0">
                <Command>
                  <CommandInput placeholder="اختر الشهر" />
                  <CommandEmpty>لم يتم العثور على أي شهر.</CommandEmpty>
                  <CommandGroup className="overflow-auto">
                    <div className="my-2">
                      <PostMonthForm years={years} />
                    </div>

                    {postMonths.map((month) => (
                      <CommandItem
                        key={month.id}
                        onSelect={() => {
                          setMonthId(month.id);
                          setOpenMonth(false);
                        }}
                      >
                        <AiOutlineCheck
                          className={cn(
                            "mr-2 h-4 w-4",
                            monthId === month.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {month.name}{" "}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <DialogClose disabled={!image || !content} className="w-full">
            <Button
              disabled={!title || !image}
              className="w-full"
              onClick={async () => {
                if (article?.id) {
                  await updateArticle(
                    article.id,
                    title,
                    image,
                    content,
                    presenterId,
                    typeId,
                    monthId
                  );
                } else {
                  await addArticle(
                    title,
                    image,
                    content,
                    presenterId,
                    typeId,
                    monthId
                  );
                  setTitle("");
                  setImage("");
                  setContent("");
                  setPresenterId("");
                  setTypeId("");
                  setMonthId("");
                }
              }}
            >
              {article?.id ? "تعديل" : "إضافة"}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ArticleForm;
