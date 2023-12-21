"use client";
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
import { Button } from "../ui/button";
import { AiOutlineCheck, AiOutlinePlusCircle } from "react-icons/ai";
import { Input } from "../ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { addPostMonth } from "@/lib/_actions";
import { LuChevronsUpDown } from "react-icons/lu";
import { cn } from "@/lib/utils";
function PostMonthForm({ years }: { years: { id: string; year: string }[] }) {
  const [open, setOpen] = useState(false);
  const [monthName, setMonthName] = useState("");
  const [yearId, setYearId] = useState(years[0].id);
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="">
          اضافة شهر <AiOutlinePlusCircle className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>اضافة شهر</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <span>شهر</span>
          <Input
            placeholder="month"
            onChange={(e) => {
              setMonthName(e.target.value);
            }}
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
              {yearId
                ? years.find((year) => year.id === yearId)?.year
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
                      setYearId(year.id);
                      setOpen(false);
                    }}
                  >
                    <AiOutlineCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        yearId === year.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {year.year}{" "}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <DialogClose disabled={!monthName || !yearId} asChild>
          <Button
            disabled={!monthName || !yearId}
            onClick={() => {
              addPostMonth(monthName, yearId);
            }}
          >
            حفظ
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default PostMonthForm;
