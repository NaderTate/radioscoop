import prisma from "@/lib/prisma";

import Pagination from "@/components/Pagination";
import ProgramCard from "@/app/(protected)/dashboard/programs/_components/ProgramCard";

import { itemsToFetch } from "@/lib/globals";
import AddProgramModal from "./_components/AddProgramModal";

type Props = {
  searchParams: { page: number };
};

async function GeneralProgram({ searchParams }: Props) {
  const { page } = searchParams;

  const programs = await prisma.category.findMany({
    where: {
      generalProgram: true,
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
      generalProgram: true,
    },
  });

  return (
    <div className="flex flex-col min-h-[90vh]">
      <div className="grow">
        <div className="flex justify-center my-5">
          <AddProgramModal />
        </div>
        {programs.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {programs?.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              لا يوجد برامج عامة
            </h2>
          </div>
        )}
      </div>
      <Pagination currentPage={page} total={count} />
    </div>
  );
}

export default GeneralProgram;
