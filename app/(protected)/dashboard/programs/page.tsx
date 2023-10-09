import ProgramsTable from "@/components/ProgramsTable";
import Pagination from "@/components/Pagination";
import SearchForm from "@/components/SearchForm";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { pagination } from "@/lib/utils";

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
      author: { select: { label: true } },
    },
  });
  const count = await prisma.category.count({
    where: {
      name: {
        contains: search,
      },
    },
  });
  const { Arr, pages } = pagination(count, sk, itemsToShow);

  return (
    <div>
      <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
        <Button className="my-3">
          <a href="/dashboard/features/create">إضافة برنامج</a>
        </Button>
        <SearchForm content="programs" />
      </div>
      <ProgramsTable data={programs} />
      <Pagination Arr={Arr} pages={pages} link="/dashboard/features" />
    </div>
  );
}

export default page;