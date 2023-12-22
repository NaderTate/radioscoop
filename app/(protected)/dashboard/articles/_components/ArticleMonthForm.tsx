"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import { DialogClose } from "@radix-ui/react-dialog";

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
import { Button } from "@/components/ui/button";

import { LuChevronsUpDown } from "react-icons/lu";
import { AiOutlineCheck, AiOutlinePlusCircle } from "react-icons/ai";

import { cn } from "@/lib/utils";

import { useHandleArticleMonthData } from "../_hooks/useHandleArticleMonthData";

type Props = { years: { id: string; year: string }[] };

function ArticleMonthForm({ years }: Props) {
  const [open, setOpen] = useState(false);

  const { monthData, setMonthData, isMissingData, onSubmit } =
    useHandleArticleMonthData(years);

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          اضافة شهر <AiOutlinePlusCircle className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>اضافة شهر</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input
            startContent="month"
            onValueChange={(e) => setMonthData({ ...monthData, monthName: e })}
          />
        </div>
        <Popover open={open} modal onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {monthData.yearId
                ? years.find((year) => year.id === monthData.yearId)?.year
                : "السنة..."}
              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" h-52 p-0">
            <Command>
              <CommandInput placeholder="ابحث عن سنة..." />
              <CommandEmpty>لم يتم العثور على أي سنة.</CommandEmpty>
              <CommandGroup className="overflow-auto">
                {years.map((year) => (
                  <CommandItem
                    key={year.id}
                    onSelect={() => {
                      setMonthData({ ...monthData, yearId: year.id });
                      setOpen(false);
                    }}
                  >
                    <AiOutlineCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        monthData.yearId === year.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {year.year}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <DialogClose disabled={isMissingData} asChild>
          <Button disabled={isMissingData} onClick={onSubmit}>
            حفظ
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default ArticleMonthForm;
