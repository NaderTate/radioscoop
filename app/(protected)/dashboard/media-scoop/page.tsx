import VideosTable from "@/components/VideosTable";
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
  const videos = await prisma.video.findMany({
    where: {
      title: {
        contains: search,
      },
    },
    include: {
      presenter: { select: { label: true } },
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
  const { Arr, pages } = pagination(count, sk, itemsToShow);
  return (
    <div>
      <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
        <Button className="my-3">
          <a href="/dashboard/features/create">إضافة فيديو</a>
        </Button>
        <SearchForm content="media-scoop" />
      </div>
      <VideosTable data={videos} />
      <Pagination Arr={Arr} pages={pages} link="/dashboard/videos" />
    </div>
  );
}

export default page;
