import EpisodeCard from "@/components/EpisodeCard";
import Pagination from "@/components/Pagination";
import { pagination } from "@/lib/utils";

async function Program({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: string };
}) {
  const { page } = searchParams;
  const sk = Number(page) || 1;
  const itemsToShow = 30;
  const episodes = await prisma.episode.findMany({
    where: {
      featured: false,

      categoryId: id,
    },
    include: {
      category: {
        select: {
          name: true,
          author: { select: { name: true } },
        },
      },
    },
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
    orderBy: {
      id: "desc",
    },
  });
  const count = await prisma.episode.count({
    where: {
      featured: false,

      categoryId: id,
    },
  });
  const { Arr, pages } = pagination(count, sk, itemsToShow);

  return (
    <div>
      <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 sm:py-20">
        <div className="max-w-xl mx-auto text-center ">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl ">
            برنامج {episodes[0]?.category?.name}
          </h2>
          <p className="text-center my-4">
            تقديم {episodes[0]?.category?.author?.name || "راديو سكوب"}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {episodes?.map((episode) => (
            <EpisodeCard key={episode.id} ep={episode} />
          ))}
        </div>
        <Pagination pages={pages} Arr={Arr} link="/programs" currentPage={sk} />
      </div>
    </div>
  );
}

export default Program;
