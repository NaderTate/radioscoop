import FeaturesTable from "@/components/FeaturesTable";
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
  const features = await prisma.episode.findMany({
    where: {
      featured: true,
      title: {
        contains: search,
      },
    },
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
    orderBy: {
      id: "desc",
    },
    include: {
      preparedBy: { select: { label: true } },
      presenter: { select: { label: true } },
    },
  });
  const count = await prisma.episode.count({
    where: {
      featured: true,
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
          <a href="/dashboard/features/create">إضافة فيتشر</a>
        </Button>
        <SearchForm content="features" />
      </div>
      <FeaturesTable data={features} />
      <Pagination Arr={Arr} pages={pages} link="/dashboard/features" />
    </div>
  );
}

export default page;
