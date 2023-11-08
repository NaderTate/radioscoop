import NextUIPagination from "@/components/NextUIPagination";

import PresenetersTable from "@/components/PresenetersTable";
import PresenterForm from "@/components/PresenterForm";
import SearchForm from "@/components/SearchForm";
import prisma from "@/lib/prisma";

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
  return (
    <div>
      <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
        <PresenterForm />
        <SearchForm content="presenters" />
      </div>
      <PresenetersTable data={presenters} />
      <NextUIPagination
        total={Math.floor(count / itemsToShow)}
        queries={["search"]}
      />
    </div>
  );
}

export default page;
