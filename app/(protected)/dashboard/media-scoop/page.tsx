import VideosTable from "@/components/VideosTable";

import SearchForm from "@/components/SearchForm";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

import VideoForm from "@/components/VideoForm";
import Pagination from "@/components/Pagination";
async function page({
  searchParams,
}: {
  searchParams: { search: string; page: string };
}) {
  const { search, page } = searchParams;
  const sk = Number(page) || 1;
  const itemsToShow = 30;
  const videos = await prisma.video.findMany({
    where: {
      title: {
        contains: search,
      },
    },
    include: {
      presenter: { select: { name: true } },
    },
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
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
  const presenters = await prisma.author.findMany({
    select: { id: true, name: true },
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
        <VideoForm presenters={presenters} />
        <SearchForm content="media-scoop" />
      </div>
      <VideosTable presenters={presenters} data={videos} />
      <Pagination total={Math.ceil(count / itemsToShow)} queries={["search"]} />
    </div>
  );
}

export default page;
