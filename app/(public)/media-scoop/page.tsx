import prisma from "@/lib/prisma";

import { Image } from "@nextui-org/image";

import NextUIPagination from "@/components/NextUIPagination";

export const metadata = {
  title: "ميديا سكووب",
};

type Props = {
  searchParams: { page: string };
};

async function page({ searchParams }: Props) {
  const { page } = searchParams;
  const pageNumber = Number(page) || 1;
  const itemsToShow = 30;

  const videos = await prisma.video.findMany({
    take: itemsToShow,
    skip: (pageNumber - 1) * itemsToShow,
    orderBy: {
      id: "desc",
    },
  });

  const count = await prisma.video.count();

  return (
    <>
      <div className="max-w-xl mx-auto text-center mt-10">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          راديو سكووب
        </h2>
        <p className="max-w-lg mx-auto mt-4 text-gring-offset-warm-gray-500">
          اول راديو اون لاين في مصر بينقل المميزين من متدربيه الي الاذاعات ال FM
          الكبرى
        </p>
      </div>
      <div className="grid  grid-cols-2  gap-4 sm:mx-auto sm:w-fit justify-center md:grid-cols-3 md:gap-7 mt-10 lg:grid-cols-5">
        {videos.map((video) => (
          <a key={video.id} href={video.link} target="_blank">
            <div className="relative mx-auto hover:scale-[1.02] transition">
              <Image
                width={200}
                height={200}
                src={video.image}
                alt=""
                className="rounded-md aspect-[9/16] object-cover brightness-75"
              />
              <div className="absolute bottom-2 z-10 right-2 font-bold text-white">
                {video.title}
              </div>
            </div>
          </a>
        ))}
      </div>
      <NextUIPagination total={Math.ceil(count / itemsToShow)} />
    </>
  );
}

export default page;
