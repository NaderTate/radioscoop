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
import { addType } from "@/lib/_actions";
function PostTypeForm({ type }: { type?: Type }) {
  const [name, setName] = useState(type?.name || "");
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full">إضافة تصنيف</Button>
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
          <DialogClose className="w-full">
            <Button
              disabled={!name}
              className="w-full"
              onClick={async () => {
                const res = await addType(name);

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
