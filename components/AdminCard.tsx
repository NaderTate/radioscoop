"use client";
import { User } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiFillDelete } from "react-icons/ai";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { deleteAdmin } from "@/lib/_actions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function AdminCard({ admin }: { admin: User }) {
  return (
    <div
      key={admin.id}
      className="border-primary border rounded-md p-5 relative"
    >
      <div className="flex items-center gap-5">
        <Avatar>
          <AvatarImage src={admin.image} alt={admin.name} />
          <AvatarFallback>{admin.name[0]}</AvatarFallback>
        </Avatar>
        <p>{admin.name}</p>
      </div>
      <p>{admin.email}</p>
      <div className="absolute top-1 left-1">
        <Dialog>
          <DialogTrigger>
            <AiFillDelete size={20} className="text-2xl cursor-pointer" />
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
                <Button
                  onClick={async () => {
                    await deleteAdmin(admin.id);
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
    </div>
  );
}

export default AdminCard;
