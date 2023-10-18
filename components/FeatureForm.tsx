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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { AiOutlineCheck, AiOutlinePlusCircle } from "react-icons/ai";
import { LuChevronsUpDown } from "react-icons/lu";
import { createEpisode, updateEpisode } from "@/lib/_actions";
import { FiEdit } from "react-icons/fi";
import { DialogClose } from "@radix-ui/react-dialog";
import { Episode } from "@prisma/client";

function FeatureForm({
  feature,
  presenters,
}: {
  feature?: Episode;
  presenters: { id: string; name: string }[];
}) {
  const [openPresenter, setOpenPresenter] = useState(false);
  const [openPreparer, setOpenPreparer] = useState(false);
  const [featureTitle, setFeatureTitle] = useState(feature?.featureTitle || "");
  const [preparerId, setPreparerId] = useState(feature?.preparedById || "");
  const [presenterId, setPresenterId] = useState(feature?.presenterId || "");
  return (
    <Dialog>
      <DialogTrigger>
        {feature?.id ? (
          <FiEdit className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        ) : (
          <Button className="w-full">
            إضافة فيتشر <AiOutlinePlusCircle className="mr-2 h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent></DialogContent>
    </Dialog>
  );
}

export default FeatureForm;
