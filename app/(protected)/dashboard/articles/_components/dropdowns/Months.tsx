import PostMonthForm from "@/components/dashboard/PostMonthForm";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { LuChevronsUpDown } from "react-icons/lu";
type Props = {
  postMonths: { id: string; name: string; year: { year: string } }[];
  postMonthId: string | null;
  years: { id: string; year: string }[];
  onSelect: (id: string) => () => void;
};

const Months = ({ postMonths, postMonthId, years, onSelect }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} modal onOpenChange={setOpen}>
      <PopoverTrigger className="mx-2" asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {postMonthId
            ? postMonths.find((month) => month.id === postMonthId)?.name
            : "الشهر..."}
          <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" h-52 p-0">
        <Command>
          <CommandInput placeholder="اختر الشهر" />
          <CommandEmpty>لم يتم العثور على أي شهر.</CommandEmpty>
          <CommandGroup className="overflow-auto">
            <div className="my-2">
              <PostMonthForm years={years} />
            </div>

            {postMonths.map((month) => (
              <CommandItem
                key={month.id}
                onSelect={() => {
                  onSelect(month.id)();
                  setOpen(false);
                }}
              >
                <AiOutlineCheck
                  className={cn(
                    "mr-2 h-4 w-4",
                    postMonthId === month.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {month.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Months;
