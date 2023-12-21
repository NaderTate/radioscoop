import { useState } from "react";

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
import ProgramForm from "@/components/dashboard/ProgramForm";

import { cn } from "@/lib/utils";

import { AiOutlineCheck } from "react-icons/ai";
import { LuChevronsUpDown } from "react-icons/lu";

type Props = {
  programId: string | undefined;
  programs: {
    name: string;
    id: string;
    month: { name: string; year: { year: string } } | null;
  }[];
  onSelect: (id: string) => void;
};

const ProgramsDropdown = ({ programId, programs, onSelect }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} modal onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {programId
            ? programs.find((program) => program.id === programId)?.name
            : "البرنامج..."}
          <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" h-52 p-0">
        <Command>
          <CommandInput placeholder="ابحث عن برنامج..." />
          <CommandEmpty>لم يتم العثور على أي برنامج.</CommandEmpty>
          <CommandGroup className="overflow-auto">
            <div className="my-2">
              <ProgramForm presenters={programs} />
            </div>
            {programs.map((program) => (
              <CommandItem
                key={program.id}
                onSelect={() => {
                  onSelect(program.id);
                  setOpen(false);
                }}
              >
                <AiOutlineCheck
                  className={cn(
                    "mr-2 h-4 w-4",
                    programId === program.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {program.name}{" "}
                {program.month &&
                  program.month.year &&
                  `(${program.month.year.year} - ${program.month.name})`}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProgramsDropdown;
