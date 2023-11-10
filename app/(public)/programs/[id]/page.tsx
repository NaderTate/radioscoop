import EpisodeCard from "@/components/EpisodeCard";
import NextUIPagination from "@/components/NextUIPagination";
import Link from "next/link";
import prisma from "@/lib/prisma";
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
  const program = await prisma.category.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      author: { select: { name: true, id: true } },
      month: {
        select: { name: true, year: { select: { year: true } } },
      },
    },
  });
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
          month: {
            select: { name: true, year: { select: { year: true } } },
          },
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

  return (
    <div>
      <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 sm:py-20">
        <div className="max-w-xl mx-auto text-center ">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            برنامج {program?.name}
          </h2>
          تقديم :{" "}
          <Link
            href={{ pathname: `/announcers/${program?.author?.id}` }}
            className="text-center my-4 underline"
          >
            {program?.author?.name}
          </Link>
          <p className="text-sm my-4">
            {program?.month?.year.year} / {program?.month?.name}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {episodes?.map((episode) => (
            <EpisodeCard key={episode.id} ep={episode} />
          ))}
        </div>
        <NextUIPagination total={Math.ceil(count / itemsToShow)} />
      </div>
    </div>
  );
}
export default Program;
