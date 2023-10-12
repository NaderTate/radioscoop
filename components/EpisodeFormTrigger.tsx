"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import EpisodeForm from "./EpisodeForm";
import { useState } from "react";
function EpisodeFormTrigger({
  programs,
  episode,
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
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog
      open={open}
      modal={true}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DialogTrigger>
        <Button>إضافة حلقة</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>اضافة حلقة جديدة</DialogTitle>
        </DialogHeader>
        <EpisodeForm
          programs={programs}
          handleOpen={(open) => {
            setOpen(open);
          }}
          episode={episode}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EpisodeFormTrigger;
