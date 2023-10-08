"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
function CreateAdmin() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>إضافة مشرف</Button>{" "}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>هل أنت متأكد؟</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center gap-5">
            <DialogClose>
              <Button variant="default">لا</Button>
            </DialogClose>
            <DialogClose>
              <Button variant="destructive">حذف</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateAdmin;
