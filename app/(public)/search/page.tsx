import prisma from "@/lib/prisma";

import ProgramCard from "@/components/ProgramCard";
import AnnouncerCard from "@/components/AnnouncerCard";
import NextUIPagination from "@/components/NextUIPagination";

type Props = {
  searchParams: { page: string; search: string };
};

async function Search({ searchParams }: Props) {
  const { search, page } = searchParams;
  const pageNumber = Number(page) || 1;
  const itemsToShow = 30;
  const announcers = await prisma.author.findMany({
    where: {
      name: {
        contains: search,
      },
    },
    take: itemsToShow,
    skip: (pageNumber - 1) * itemsToShow,
    orderBy: {
      id: "desc",
    },
  });

  const programs = await prisma.category.findMany({
    where: {
      name: {
        contains: search,
      },
    },
    include: {
      author: { select: { name: true } },
      month: { select: { name: true, year: { select: { year: true } } } },
    },
    take: itemsToShow,
    orderBy: {
      id: "desc",
    },
  });

  const total = await prisma.category.count({
    where: {
      name: {
        contains: search,
      },
    },
  });

  return (
    <div className="p-5">
      <h1 className="text-center font-semibold my-5 text-2xl">نتائج البحث</h1>
      {announcers.length > 0 && (
        <>
          <h2 className="text-center font-semibold my-5">المذيعين</h2>
          <div className="flex flex-wrap justify-center gap-5">
            {announcers.map((announcer) => {
              return (
                <AnnouncerCard
                  key={announcer.id}
                  id={announcer.id}
                  name={announcer.name}
                  img={announcer.img}
                />
              );
            })}
          </div>
        </>
      )}
      {programs.length > 0 && (
        <>
          <h2 className="text-center font-semibold my-5">البرامج</h2>
          <div className="flex flex-wrap justify-center gap-5">
            {programs.map((program) => {
              return <ProgramCard key={program.id} program={program} />;
            })}
          </div>
        </>
      )}

      <NextUIPagination total={Math.ceil(total / itemsToShow)} />
    </div>
  );
}

export default Search;
