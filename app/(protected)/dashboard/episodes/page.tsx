import EpisodeForm from "@/components/EpisodeForm";
import EpisodesTable from "@/components/EpisodesTable";
import Pagination from "@/components/Pagination";
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
    include: {
      category: {
        select: {
          author: {
            select: {
              name: true,
            },
          },
          name: true,
          img: true,
        },
      },
    },
  });
  const programs = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      month: {
        select: {
          name: true,
          year: {
            select: {
              year: true,
            },
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },
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
        <EpisodeForm programs={programs} />
        <SearchForm content="episodes" />
      </div>
      <EpisodesTable programs={programs} data={Episodes} />
      <Pagination
        Arr={Arr}
        pages={pages}
        link="/dashboard/episodes"
        currentPage={sk}
      />
    </div>
  );
}

export default page;
