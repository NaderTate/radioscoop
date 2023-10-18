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
import { Type } from "@prisma/client";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { addFeatureType, addType } from "@/lib/_actions";
import { AiOutlinePlusCircle } from "react-icons/ai";
function PostTypeForm({ type, For }: { type?: Type; For: string }) {
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
                  await addType(name);
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
