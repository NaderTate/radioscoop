import prisma from "@/lib/prisma";

import AnnouncerCard from "@/components/public/AnnouncerCard";
import Pagination from "@/components/Pagination";
import { itemsToFetch } from "@/lib/globals";

export const revalidate = 60;

export const metadata = {
  title: "المذيعون",
  description: "مذيعون راديو سكووب",
};

type Props = {
  searchParams: { page: number; search: string };
};

async function Announcers({ searchParams }: Props) {
  const { page, search } = searchParams;

  const announcers = await prisma.author.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          Categories: {
            some: {
              name: {
                contains: search,
              },
            },
          },
        },
      ],
    },
    take: itemsToFetch,
    skip: ((page ?? 1) - 1) * itemsToFetch,
    orderBy: {
      id: "desc",
    },
  });

  const count = await prisma.author.count({
    where: {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          Categories: {
            some: {
              name: {
                contains: search,
              },
            },
          },
        },
      ],
    },
  });

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-5 justify-center ">
        {announcers.map((announcer) => {
          return (
            <AnnouncerCard
              key={announcer.id}
              id={announcer.id}
              name={announcer.name}
              img={announcer.img}
            />
          );
        })}
      </div>
      <Pagination currentPage={page} total={count} queries={{ search }} />
    </div>
  );
}

export default Announcers;
