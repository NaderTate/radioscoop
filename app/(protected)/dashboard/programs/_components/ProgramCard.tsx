"use client";

import { Category } from "@prisma/client";

import Link from "next/link";
import { Image } from "@nextui-org/image";

import { RxCross2 } from "react-icons/rx";
import { Button } from "@nextui-org/react";
import { removeProgramFromSeries } from "@/actions/program";

interface Program extends Category {
  author: { name: string }[] | null;
  month: { name: string; year: { year: string } } | null;
}
interface ProgramCardProps {
  program: Program;
  isSeries?: boolean;
}
function ProgramCard({ program, isSeries = false }: ProgramCardProps) {
  return (
    <Link href={{ pathname: `/programs/${program.id}` }}>
      <div className="block overflow-hidden rounded-2xl flex-1 relative">
        {isSeries && (
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onClick={async (e) => {
              e.preventDefault();
              await removeProgramFromSeries(program.id);
            }}
            className="z-20 absolute top-2 right-2 bg-gray-900 text-white rounded-full p-1"
          >
            <RxCross2 />
          </Button>
        )}
        <Image
          width={350}
          height={350}
          alt={program.name}
          src={program.img}
          className="object-cover aspect-square w-full rounded-b-none"
        />

        <div className="bg-gray-900 p-4">
          <p className="text-xs text-gray-500">
            {program?.month?.year.year} / {program?.month?.name}
          </p>

          <h5 className="text-sm text-white">{program.name}</h5>

          <p className="mt-1 text-xs text-gray-500">
            {program.author
              ? program.author.map((author) => author.name)
              : "راديو سكوب"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProgramCard;
