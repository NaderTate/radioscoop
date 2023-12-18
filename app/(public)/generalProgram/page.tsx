import prisma from "@/lib/prisma";

import ProgramCard from "@/components/ProgramCard";
import NextUIPagination from "@/components/NextUIPagination";

export const revalidate = 60;

export const metadata = {
  title: "البرنامج العام",
};

type Props = {
  searchParams: { page: string };
};

async function GeneralProgram({ searchParams }: Props) {
  const pageNumber = Number(searchParams.page) || 1;
  const itemsPerPage = 30;

  const programs = await prisma.category.findMany({
    where: {
      generalProgram: true,
    },
    take: itemsPerPage,
    skip: (pageNumber - 1) * itemsPerPage,
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
      generalProgram: true,
    },
  });

  return (
    <>
      <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 sm:py-24">
        <div className="max-w-xl mx-auto text-center ">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            البرنامج العام
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {programs?.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
        <NextUIPagination total={Math.ceil(count / itemsPerPage)} />
      </div>
    </>
  );
}

export default GeneralProgram;
