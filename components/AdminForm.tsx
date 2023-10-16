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
import { useState } from "react";
import { addAdmin } from "@/lib/_actions";
import { DialogClose } from "@radix-ui/react-dialog";

function AdminForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full">إضافة مشرف</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>اضافة مشرف جديد</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2">
            <Input
              placeholder="الاسم"
              defaultValue={name}
              onChange={async (e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="البريد الالكتروني"
              defaultValue={email}
              onChange={async (e) => setEmail(e.target.value)}
            />
          </div>
          <DialogClose className="w-full">
            <Button
              disabled={!name || !email}
              className="w-full"
              onClick={async () => {
                const res = await addAdmin(name, email);
                if (res.error) {
                  alert(res.error);
                }
                setName("");
                setEmail("");
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

export default AdminForm;
