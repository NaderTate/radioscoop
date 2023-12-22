"use client";

import { Type } from "@prisma/client";

import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";

import { addArticleType } from "@/actions/articles";
import { addFeatureType } from "@/actions/features";

import { AiOutlinePlusCircle } from "react-icons/ai";

type Props = {
  type?: Type;
  For: string;
};

function PostTypeForm({ type, For }: Props) {
  const [name, setName] = useState(type?.name || "");
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full">
          إضافة تصنيف <AiOutlinePlusCircle className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>اضافة تصنيف جديد</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2">
            <Input
              placeholder="الاسم"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <DialogClose disabled={!name} className="w-full">
            <Button
              disabled={!name}
              className="w-full"
              onClick={async () => {
                if (For == "post") {
                  await addArticleType(name);
                } else {
                  await addFeatureType(name);
                }
                setName("");
              }}
            >
              إضافة
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PostTypeForm;
