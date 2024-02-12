"use client";

import { Input } from "@nextui-org/react";
import { DialogClose } from "@radix-ui/react-dialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { deleteYear } from "@/actions/years";

import { TiEdit } from "react-icons/ti";
import { MdDeleteOutline } from "react-icons/md";
import { useHanldeYearData } from "../_hooks/useHandleYearData";
import { AiOutlinePlusCircle } from "react-icons/ai";

type Props = { year?: { id: string; name: string } };

const YearForm = ({ year }: Props) => {
  const { yearData, setYearData, onSubmit } = useHanldeYearData(year);
  return (
    <Dialog>
      <DialogTrigger asChild className={`${year && "absolute top-0 right-0"}`}>
        {year ? (
          <TiEdit className="cursor-pointer" size={20} />
        ) : (
          <Button size={"lg"}>
            اضافة سنة <AiOutlinePlusCircle size={25} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        {year?.id && (
          <DialogClose>
            <MdDeleteOutline
              size={20}
              fill="#f44336"
              className="m-auto ml-0 cursor-pointer"
              onClick={async () => {
                await deleteYear(year.id);
              }}
            />
          </DialogClose>
        )}
        <DialogHeader>
          <DialogTitle>{year?.id ? "تعديل السنة" : "اضافة سنة"}</DialogTitle>
        </DialogHeader>
        <Input
          variant="bordered"
          defaultValue={yearData.name}
          label="year"
          onValueChange={(e) => setYearData({ ...yearData, name: e })}
        />
        <DialogClose asChild>
          <Button onClick={onSubmit}>{year?.id ? "حفظ" : "اضافة"}</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default YearForm;
