import { useState } from "react";

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

import { cn } from "@/lib/utils";

import { AiOutlineCheck } from "react-icons/ai";
import { LuChevronsUpDown } from "react-icons/lu";
import PresenterForm from "../../../announcers/_components/PresenterForm";

type Props = {
  presenterId: string | null | undefined;
  presenters: { id: string; name: string }[];
  onSelect: (id: string) => void;
};

const Presenter = ({ presenterId, presenters, onSelect }: Props) => {
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
          {presenterId
            ? presenters.find((presenter) => presenter.id === presenterId)?.name
            : "تقديم..."}
          <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" h-52 p-0">
        <Command>
          <CommandInput placeholder="ابحث عن مذيع..." />
          <CommandEmpty>لم يتم العثور على أي مذيع.</CommandEmpty>
          <CommandGroup className="overflow-auto">
            <div className="my-2">
              <PresenterForm />
            </div>

            {presenters.map((presenter) => (
              <CommandItem
                key={presenter.id}
                onSelect={() => {
                  onSelect(presenter.id);
                  setOpen(false);
                }}
              >
                <AiOutlineCheck
                  className={cn(
                    "mr-2 h-4 w-4",
                    presenterId === presenter.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {presenter.name}{" "}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Presenter;
