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
import ProgramsDropdown from "./ProgramsDropdown";

import { useHandleEpisodeData } from "../_hooks/useHandleEpisodeData";

import { FiEdit } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";

type Props = {
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
    embedLink?: string | null;
  };
};

function EpisodeForm({ programs, episode }: Props) {
  const { episodeData, setEpisodeData, missingData, onSubmit } =
    useHandleEpisodeData(episode);

  return (
    <Dialog>
      <DialogTrigger>
        {episode?.id ? (
          <FiEdit size={15} className=" opacity-50 m-auto" />
        ) : (
          <div className="bg-primary rounded-md text-secondary-50 p-3 flex items-center">
            إضافة حلقة <AiOutlinePlusCircle className="mr-2 h-4 w-4" />
          </div>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {episode?.id ? "تعديل الحلقة" : "اضافة حلقة جديدة"}
          </DialogTitle>
        </DialogHeader>
        <Input
          variant="bordered"
          defaultValue={episodeData.title}
          min={1}
          className="w-fit"
          type="number"
          label="رقم الحلقة"
          onValueChange={(e) => {
            setEpisodeData({ ...episodeData, title: e });
          }}
        />
        <Input
          variant="bordered"
          defaultValue={episodeData.link}
          label="الرابط"
          onValueChange={(e) => {
            console.log(e);
            setEpisodeData({ ...episodeData, link: e });
          }}
        />
        <Input
          variant="bordered"
          defaultValue={episodeData.embedLink || ""}
          label="رابط الفيديو (embed)"
          onValueChange={(e) => {
            console.log(e);

            setEpisodeData({ ...episodeData, embedLink: e });
          }}
        />

        <ProgramsDropdown
          programs={programs}
          programId={episodeData.programId}
          onSelect={(id) => {
            setEpisodeData({ ...episodeData, programId: id });
          }}
        />
        <DialogClose disabled={missingData}>
          <Button
            disabled={missingData}
            className="block w-full"
            onClick={onSubmit}
          >
            {episode?.id ? "تعديل" : "إضافة"}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default EpisodeForm;
