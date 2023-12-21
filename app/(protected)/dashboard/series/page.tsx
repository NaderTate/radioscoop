import prisma from "@/lib/prisma";

import Pagination from "@/components/Pagination";
import ProgramCard from "@/app/(protected)/dashboard/programs/_components/ProgramCard";

import AddProgramForm from "./AddProgramForm";

import { itemsToFetch } from "@/lib/globals";

type Props = {
  searchParams: { page: number };
};

async function Seriess({ searchParams }: Props) {
  const page = searchParams.page || 1;

  const programs = await prisma.category.findMany({
    where: {
      series: true,
    },
    take: itemsToFetch,
    skip: ((page ?? 1) - 1) * itemsToFetch,
    include: {
      author: { select: { name: true } },
      month: { select: { name: true, year: { select: { year: true } } } },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const count = await prisma.category.count({
    where: {
      series: true,
    },
  });
  return (
    <div>
      <div className="flex justify-center ">
        <AddProgramForm />
      </div>
      {programs.length > 0 ? (
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">مسلسلات FM</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {programs?.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            لا يوجد مسلسلات
          </h2>
        </div>
      )}
      <Pagination currentPage={page} total={count} />
    </div>
  );
}

export default Seriess;
