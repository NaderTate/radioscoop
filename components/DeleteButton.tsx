"use client";
import { AiFillDelete } from "react-icons/ai";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
function DeleteButton({
  deleteAction,
  id,
}: {
  deleteAction: Function;
  id: string;
}) {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex items-center">
          <AiFillDelete size={20} className=" cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>هل أنت متأكد؟</DialogTitle>
            <DialogDescription>
              لا يمكنك التراجع عن هذا الإجراء
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-5">
            <DialogClose>
              <Button variant="default">لا</Button>
            </DialogClose>
            <DialogClose>
              <Button
                onClick={async () => {
                  await deleteAction(id);
                }}
                variant="destructive"
              >
                حذف
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DeleteButton;
