import ProgramsTable from "@/components/ProgramsTable";
import Pagination from "@/components/Pagination";
import SearchForm from "@/components/SearchForm";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { pagination } from "@/lib/utils";
import ProgramForm from "@/components/ProgramForm";

async function page({
  searchParams,
}: {
  searchParams: { search: string; page: string };
}) {
  const { search, page } = searchParams;
  const sk = Number(page) || 1;
  const itemsToShow = 30;
  const programs = await prisma.category.findMany({
    where: {
      name: {
        contains: search,
      },
    },
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
    orderBy: {
      id: "desc",
    },
    include: {
      episodes: { select: { id: true } },
      author: { select: { name: true } },
      month: { select: { name: true, year: { select: { year: true } } } },
    },
  });
  const count = await prisma.category.count({
    where: {
      name: {
        contains: search,
      },
    },
  });
  const presenetrs = await prisma.author.findMany({
    select: { id: true, name: true },
    orderBy: { id: "desc" },
  });
  const { Arr, pages } = pagination(count, sk, itemsToShow);

  return (
    <div>
      <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
        <ProgramForm presenters={presenetrs} />
        <SearchForm content="programs" />
      </div>
      <ProgramsTable presenters={presenetrs} data={programs} />
      <Pagination
        Arr={Arr}
        pages={pages}
        link="/dashboard/programs"
        currentPage={sk}
      />
    </div>
  );
}

export default page;
