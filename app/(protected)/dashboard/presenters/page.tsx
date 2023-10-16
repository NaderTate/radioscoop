import Pagination from "@/components/Pagination";
import PresenetersTable from "@/components/PresenetersTable";
import PresenterForm from "@/components/PresenterForm";
import SearchForm from "@/components/SearchForm";
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
  const presenters = await prisma.author.findMany({
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
  const { Arr, pages } = pagination(count, sk, itemsToShow);
  return (
    <div>
      <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
        <PresenterForm />
        <SearchForm content="presenters" />
      </div>
      <PresenetersTable data={presenters} />
      <Pagination Arr={Arr} pages={pages} link="/dashboard/presenters" />
    </div>
  );
}

export default page;
