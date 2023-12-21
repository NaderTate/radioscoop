import prisma from "@/lib/prisma";

import VideoForm from "./_components/VideoForm";
import Pagination from "@/components/Pagination";
import VideosTable from "./_components/VideosTable";
import SearchInput from "@/components/dashboard/SearchInput";

import { itemsToFetch } from "@/lib/globals";

type Props = {
  searchParams: { search: string; page: number };
};

async function page({ searchParams }: Props) {
  const { search, page } = searchParams;

  const videos = await prisma.video.findMany({
    where: {
      title: {
        contains: search,
      },
    },
    include: {
      presenter: { select: { name: true } },
    },
    take: itemsToFetch,
    skip: ((page ?? 1) - 1) * itemsToFetch,
    orderBy: {
      id: "desc",
    },
  });

  const count = await prisma.video.count({
    where: {
      title: {
        contains: search,
      },
    },
  });

  const announcers = await prisma.author.findMany({
    select: { id: true, name: true },
    orderBy: { id: "desc" },
  });

  return (
    <div className="flex flex-col min-h-[90vh]">
      <div className="grow">
        <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
          <VideoForm announcers={announcers} />
          <SearchInput />
        </div>
        <VideosTable presenters={announcers} data={videos} />
      </div>
      <Pagination currentPage={page} total={count} queries={{ search }} />
    </div>
  );
}

export default page;
