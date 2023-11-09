import FeatureForm from "@/components/FeatureForm";
import FeaturesTable from "@/components/FeaturesTable";
import NextUIPagination from "@/components/NextUIPagination";

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
      preparedBy: { select: { name: true } },
      presenter: { select: { name: true } },
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

  const presenters = await prisma.author.findMany({
    select: { id: true, name: true },
    orderBy: { id: "desc" },
  });
  const types = await prisma.featureType.findMany({
    select: { id: true, name: true },
    orderBy: { id: "desc" },
  });
  return (
    <div>
      <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
        <FeatureForm types={types} presenters={presenters} />
        <SearchForm content="features" />
      </div>
      <FeaturesTable types={types} presenters={presenters} data={features} />
      <NextUIPagination
        total={Math.ceil(count / itemsToShow)}
        queries={["search"]}
      />
    </div>
  );
}

export default page;
