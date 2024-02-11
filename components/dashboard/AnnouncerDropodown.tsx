import { useState } from "react";
import Select, { Theme } from "react-select";

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

import PresenterForm from "@/app/(protected)/dashboard/announcers/_components/PresenterForm";

import { cn } from "@/lib/utils";

import { AiOutlineCheck } from "react-icons/ai";
import { LuChevronsUpDown } from "react-icons/lu";

type Props = {
  multi?: boolean;
  announcers: { id: string; name: string }[];
  announcerIDs?: string[] | null | undefined;
  announcerId?: string | null;
  onSelectMulti?: (IDs: string[]) => void;
  onSelect?: (Id: string) => void;
};
const AnnouncerDropodown = ({
  announcerIDs,
  announcers,
  onSelectMulti,
  announcerId,
  onSelect,
  multi = false,
}: Props) => {
  const [open, setOpen] = useState(false);
  const allAnnoucers = announcers.map((announcer) => ({
    label: announcer.name,
    value: announcer.id,
  }));

  if (multi)
    return (
      <Select
        className="text-white"
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: "transparent",
            borderRadius: "0.65rem",
            padding: "0.5rem",
            color: "black",
          }),
          // chnage backround color of dropdown list
          menu: (base) => ({
            ...base,
            backgroundColor: "#3f3f46",
          }),
          // remove the hover effect
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#1f2937" : "#3f3f46",
            color: "white",
          }),
          input: (provided, state) => ({
            ...provided,
            color: state.theme.colors.primary,
          }),
        }}
        placeholder="المذيع..."
        defaultValue={allAnnoucers.filter((announcer) =>
          announcerIDs?.includes(announcer.value)
        )}
        options={allAnnoucers}
        onChange={(e) => {
          onSelectMulti && onSelectMulti(e.map((item) => item.value));
        }}
        isMulti
        isClearable
      />
    );
  return (
    <Popover open={open} modal onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {announcerId
            ? announcers.find((announcer) => announcer.id === announcerId)?.name
            : "المذيع..."}
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
            {announcers.map((presenter) => (
              <CommandItem
                key={presenter.id}
                onSelect={() => {
                  onSelect && onSelect(presenter.id);
                  setOpen(false);
                }}
              >
                <AiOutlineCheck
                  className={cn(
                    "mr-2 h-4 w-4",
                    announcerId === presenter.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {presenter.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AnnouncerDropodown;
