import React from "react";
import Link from "next/link";
import { Category } from "@prisma/client";
import { Image } from "@nextui-org/image";
interface Program extends Category {
  author: { name: string } | null;
  month: { name: string; year: { year: string } } | null;
}
function ProgramCard({ program }: { program: Program }) {
  return (
    <Link href={{ pathname: `/programs/${program.id}` }}>
      <div className="block overflow-hidden rounded-2xl flex-1 ">
        <Image
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
            {program.author ? program.author.name : "راديو سكوب"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProgramCard;
