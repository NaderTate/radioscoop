"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
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
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { LuChevronsUpDown } from "react-icons/lu";
import { createNewEpisode } from "@/lib/_actions";

function EpisodeForm({
  programs,
  episode,
  handleOpen,
}: {
  programs: {
    name: string;
    id: string;
    month: { name: string; year: { year: string } } | null;
  }[];
  episode?: {
    id: string;
    title: string;
    link: string;
    programId: string;
  };
  handleOpen: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [programId, setProgramId] = useState(episode?.programId || "");
  const [title, setTitle] = useState(episode?.title || "");
  const [link, setLink] = useState(episode?.link || "");
  const [loading, setLoading] = useState(false);
  return (
    <div className="space-y-5">
      <Input
        min={1}
        className="w-fit"
        type="number"
        placeholder="رقم الحلقة"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Input
        placeholder="الرابط (drive)"
        onChange={(e) => {
          setLink(e.target.value);
        }}
      />

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
              {programs.map((program) => (
                <CommandItem
                  key={program.id}
                  onSelect={() => {
                    setProgramId(program.id);
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
      <Button
        disabled={!title || !link || !programId}
        className="block w-full"
        onClick={async () => {
          setLoading(true);
          await createNewEpisode(String(title), link, programId);
          setTitle("");
          setLink("");
          setProgramId("");
          handleOpen(false);
          setLoading(false);
        }}
      >
        {loading ? (
          <BeatLoader color="black" size={10} />
        ) : episode?.id ? (
          "تعديل"
        ) : (
          "إضافة"
        )}
      </Button>
    </div>
  );
}

export default EpisodeForm;
