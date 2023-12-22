import prisma from "@/lib/prisma";

import Pagination from "@/components/Pagination";
import ProgramCard from "@/app/(protected)/dashboard/programs/_components/ProgramCard";

import { itemsToFetch } from "@/lib/globals";

export const revalidate = 60;

export const metadata = {
  title: "مسلسلات FM ",
};

type Props = {
  searchParams: { page: number };
};

async function GeneralProgram({ searchParams }: Props) {
  const { page } = searchParams;

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
      createdAt: "desc",
    },
  });

  const count = await prisma.category.count({
    where: {
      series: true,
    },
  });

  return (
    <>
      <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 sm:py-24">
        <div className="max-w-xl mx-auto text-center ">
          <h2 className="text-4xl font-bold tracking-tight mb-4">مسلسلات FM</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {programs?.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
        <Pagination currentPage={page} total={count} />
      </div>
    </>
  );
}

export default GeneralProgram;
