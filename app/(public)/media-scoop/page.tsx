import Pagination from "@/components/Pagination";
import prisma from "@/lib/prisma";
import { pagination } from "@/lib/utils";
import Image from "next/image";

async function page({
  searchParams,
}: {
  searchParams: {
    page: string;
  };
}) {
  const { page } = searchParams;
  const sk = Number(page) || 1;
  const itemsToShow = 30;
  const videos = await prisma.video.findMany({
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
    orderBy: {
      id: "desc",
    },
  });
  const count = await prisma.video.count();
  const { Arr, pages } = pagination(count, sk, itemsToShow);

  return (
    <div>
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
          <a href={video.link} target="_blank">
            <div className="relative w-40 h-56 mx-auto hover:scale-[1.02] transition">
              <Image
                src={video.image}
                alt=""
                fill
                className="rounded-md object-cover brightness-75"
              />
              <div className="absolute bottom-0 right-0 font-bold text-white">
                {video.title}
              </div>
            </div>
          </a>
        ))}
      </div>
      <Pagination Arr={Arr} pages={pages} link="/media-scoop" />
    </div>
  );
}

export default page;