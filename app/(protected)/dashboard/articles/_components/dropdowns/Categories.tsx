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
import PostTypeForm from "@/components/PostTypeForm";

import { cn } from "@/lib/utils";

import { AiOutlineCheck } from "react-icons/ai";
import { LuChevronsUpDown } from "react-icons/lu";

type Props = {
  typeId: string | null;
  types: { id: string; name: string }[];
  onSelect: (id: string) => () => void;
};

const Categories = ({ typeId, types, onSelect }: Props) => {
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
          {typeId
            ? types.find((type) => type.id === typeId)?.name
            : "التصنيف..."}
          <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" h-52 p-0">
        <Command>
          <CommandInput placeholder="ابحث عن تصنيف..." />
          <CommandEmpty>لم يتم العثور على أي تصنيف.</CommandEmpty>
          <CommandGroup className="overflow-auto">
            <div className="my-2">
              <PostTypeForm For="post" />
            </div>

            {types.map((type) => (
              <CommandItem
                key={type.id}
                onSelect={() => {
                  onSelect(type.id)();
                  setOpen(false);
                }}
              >
                <AiOutlineCheck
                  className={cn(
                    "mr-2 h-4 w-4",
                    typeId === type.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {type.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Categories;
