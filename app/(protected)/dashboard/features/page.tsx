import prisma from "@/lib/prisma";

import Pagination from "@/components/Pagination";
import FeatureForm from "./_components/FeatureForm";
import FeaturesTable from "./_components/FeaturesTable";
import SearchInput from "@/components/dashboard/SearchInput";

import { itemsToFetch } from "@/lib/globals";

type Props = {
  searchParams: { search: string; page: number };
};

async function page({ searchParams }: Props) {
  const { search, page } = searchParams;

  const features = await prisma.episode.findMany({
    where: {
      featured: true,
      featureTitle: {
        contains: search,
      },
    },
    take: itemsToFetch,
    skip: ((page ?? 1) - 1) * itemsToFetch,
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
      featureTitle: {
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
    <div className="flex flex-col min-h-[90vh]">
      <div className="grow">
        <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
          <FeatureForm types={types} presenters={presenters} />
          <SearchInput />
        </div>
        <FeaturesTable types={types} presenters={presenters} data={features} />
      </div>
      <Pagination currentPage={page} total={count} queries={{ search }} />
    </div>
  );
}

export default page;
