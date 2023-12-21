import prisma from "@/lib/prisma";

import Pagination from "@/components/Pagination";
import ProgramsTable from "./_components/ProgramsTable";
import ProgramForm from "@/components/dashboard/ProgramForm";
import SearchInput from "@/components/dashboard/SearchInput";

import { itemsToFetch } from "@/lib/globals";

type Props = {
  searchParams: { search: string; page: number };
};

async function page({ searchParams }: Props) {
  const { search, page } = searchParams;

  const programs = await prisma.category.findMany({
    where: {
      name: {
        contains: search,
      },
    },
    take: itemsToFetch,
    skip: ((page ?? 1) - 1) * itemsToFetch,
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
      name: true,
      img: true,
      authorId: true,
      createdAt: true,
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

  return (
    <div className="flex flex-col min-h-[90vh]">
      <div className="grow">
        <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
          <ProgramForm presenters={presenetrs} />
          <SearchInput />
        </div>
        <ProgramsTable presenters={presenetrs} data={programs} />
      </div>
      <Pagination currentPage={page} total={count} queries={{ search }} />
    </div>
  );
}

export default page;
