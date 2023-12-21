import prisma from "@/lib/prisma";

import Pagination from "@/components/Pagination";
import PresenterForm from "./_components/PresenterForm";
import SearchInput from "@/components/dashboard/SearchInput";
import PresenetersTable from "./_components/PresenetersTable";

import { itemsToFetch } from "@/lib/globals";

async function page({
  searchParams,
}: {
  searchParams: { search: string; page: number };
}) {
  const { search, page } = searchParams;
  const presenters = await prisma.author.findMany({
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
      Categories: { select: { id: true } },
    },
  });

  const count = await prisma.author.count({
    where: {
      name: {
        contains: search,
      },
    },
  });

  return (
    <div className="flex flex-col min-h-[90vh]">
      <div className="grow">
        <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
          <PresenterForm />
          <SearchInput />
        </div>
        <PresenetersTable data={presenters} />
      </div>
      <Pagination currentPage={page} total={count} queries={{ search }} />
    </div>
  );
}

export default page;
