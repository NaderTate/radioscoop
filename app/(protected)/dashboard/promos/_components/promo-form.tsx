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
import ProgramsDropdown from "../../episodes/_components/ProgramsDropdown";
import AnnouncerDropodown from "@/components/dashboard/AnnouncerDropodown";
import { FiEdit } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useHandlePromoData } from "../_hooks/useHandlePromosData";

type PromoData = {
  id?: string;
  link: string;
  img?: string;
  categoryId: string;
  presenterIds: string[];
};

type Props = {
  programs: {
    id: string;
    name: string;
    month: { name: string; year: { year: string } } | null;
  }[];
  presenters: { id: string; name: string }[];
  promo?: PromoData;
};

function PromoForm({ programs, presenters, promo }: Props) {
  const { promoData, setPromoData, onSubmit, missingData } =
    useHandlePromoData(promo);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {promo?.id ? (
          <FiEdit size={15} className="opacity-50 m-auto cursor-pointer" />
        ) : (
          <Button size={"lg"}>
            إضافة برومو <AiOutlinePlusCircle className="mr-2 h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {promo?.id ? "تعديل العرض" : "إضافة برومو جديد"}
          </DialogTitle>
        </DialogHeader>
        <Input
          variant="bordered"
          defaultValue={promoData.link}
          label="الرابط"
          onValueChange={(e) => setPromoData({ ...promoData, link: e })}
        />
        <ProgramsDropdown
          programs={programs}
          programId={promoData.categoryId}
          onSelect={(id) => setPromoData({ ...promoData, categoryId: id })}
        />
        <AnnouncerDropodown
          multi
          announcerIDs={promoData.presenterIds}
          announcers={presenters}
          onSelectMulti={(ids) =>
            setPromoData({ ...promoData, presenterIds: ids })
          }
        />
        <DialogClose asChild disabled={missingData}>
          <Button disabled={missingData} className="w-full" onClick={onSubmit}>
            {promo?.id ? "تعديل" : "إضافة"}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default PromoForm;
