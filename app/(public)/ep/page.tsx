import prisma from "@/lib/prisma";

import { Metadata } from "next";

import EpisodeCard from "@/components/EpisodeCard";
import Pagination from "@/components/Pagination";
import { itemsToFetch } from "@/lib/globals";

export const metadata: Metadata = {
  title: "حلفات راديو سكووب",
  description: "راديو سكووب",
};

export const revalidate = 60;

type Props = {
  searchParams: { page: number };
};

async function page({ searchParams }: Props) {
  const { page } = searchParams;

  const episodes = await prisma.episode.findMany({
    where: {
      featured: false,
    },
    take: itemsToFetch,
    skip: ((page ?? 1) - 1) * itemsToFetch,
    orderBy: {
      id: "desc",
    },
    include: {
      category: {
        select: {
          name: true,
          img: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const count = await prisma.episode.count({
    where: {
      featured: false,
    },
  });

  return (
    <>
      <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 sm:py-24">
        <div className="max-w-xl mx-auto text-center ">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            راديو سكووب
          </h2>
          <p className="max-w-lg mx-auto mt-4 ">
            اول راديو اون لاين في مصر بينقل المميزين من متدربيه الي الاذاعات ال
            FM الكبرى
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-center">
          {episodes?.map((episode) => (
            <EpisodeCard key={episode.id} ep={episode} />
          ))}
        </div>
        <Pagination currentPage={page} total={count} />
      </div>
    </>
  );
}

export default page;
