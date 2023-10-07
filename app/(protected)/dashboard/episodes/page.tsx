import EpisodesTable from "@/components/EpisodesTable";
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

  const Episodes = await prisma.episode.findMany({
    where: {
      featured: false,
      title: {
        contains: search,
      },
    },
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
    orderBy: {
      id: "desc",
    },
    include: { author: { select: { label: true } }, category: true },
  });
  const count = await prisma.episode.count({
    where: {
      featured: false,
      title: {
        contains: search,
      },
    },
  });
  const { Arr, pages } = pagination(count, sk, itemsToShow);
  return (
    <div>
      <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
        <Button className="my-3">
          <a href="/dashboard/episodes/create">إضافة حلقة</a>
        </Button>
        <SearchForm content="episodes" />
      </div>
      <EpisodesTable data={Episodes} />
      <Pagination Arr={Arr} pages={pages} link="/dashboard/episodes" />
    </div>
  );
}

export default page;
