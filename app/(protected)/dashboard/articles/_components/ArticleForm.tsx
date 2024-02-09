"use client";

import { Post } from "@prisma/client";

import Image from "next/image";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input, Spinner, Textarea } from "@nextui-org/react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Months from "./dropdowns/Months";
import Categories from "./dropdowns/Categories";
import { Button } from "@/components/ui/button";
import AnnouncerDropodown from "@/components/dashboard/AnnouncerDropodown";

import { useHandleArticleData } from "../_hooks/useHandleArticleData";

import { FiEdit } from "react-icons/fi";
import Dropzone from "@/components/dashboard/DropZone";

type Props = {
  presenters: { id: string; name: string }[];
  article?: Post;
  types: { id: string; name: string }[];
  postMonths: { id: string; name: string; year: { year: string } }[];
  years: { id: string; year: string }[];
};

function ArticleForm({ presenters, article, types, postMonths, years }: Props) {
  const {
    articleData,
    setArticleData,
    uploadingImage,
    handleUploadImage,
    onSubmit,
  } = useHandleArticleData(article);

  return (
    <Dialog>
      <DialogTrigger>
        {article?.id ? (
          <FiEdit size={15} className="m-auto" />
        ) : (
          <div className="bg-primary rounded-md text-secondary-50 p-3">
            إضافة مقالة
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="overflow-auto h-full max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{article?.id ? "تعديل" : "اضافة مقالة"} </DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-5">
            <Input
              label="العنوان"
              variant="bordered"
              defaultValue={articleData.title}
              onChange={(e) => {
                setArticleData({ ...articleData, title: e.target.value });
              }}
            />
            <h4>الصورة</h4>
            <Dropzone handleImages={handleUploadImage} />

            {uploadingImage && <Spinner color="primary" />}
            {articleData.image && (
              <Image
                className=" rounded-md"
                src={articleData.image}
                width={150}
                height={150}
                alt="img"
              />
            )}
            <Textarea
              minRows={10}
              label="المحتوى"
              variant="bordered"
              defaultValue={articleData.content}
              onChange={(e) =>
                setArticleData({ ...articleData, content: e.target.value })
              }
            />
            {/* <AnnouncerDropodown
              announcers={presenters}
              announcerIDs={articleData.presenterId}
              onSelect={(id: string) => {
                setArticleData({ ...articleData, presenterId: id });
              }}
            /> */}
            <Categories
              types={types}
              typeId={articleData.typeId}
              onSelect={(id: string) => () => {
                setArticleData({ ...articleData, typeId: id });
              }}
            />
            <Months
              postMonthId={articleData.postMonthId}
              postMonths={postMonths}
              years={years}
              onSelect={(id: string) => () => {
                setArticleData({ ...articleData, postMonthId: id });
              }}
            />
          </div>
          <DialogClose
            disabled={
              !articleData.image || !articleData.content || !articleData.title
            }
            className="w-full"
          >
            <Button
              disabled={
                !articleData.image || !articleData.content || !articleData.title
              }
              color="primary"
              className="w-full"
              onClick={onSubmit}
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
