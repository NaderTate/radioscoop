"use server";

import prisma from "@/lib/prisma";

import { itemsToFetch } from "@/lib/globals";

export const getEpisodes = async (search: string, page: number) => {
  const episodes = await prisma.episode.findMany({
    where: {
      featured: false,
      OR: [
        {
          category: {
            name: {
              contains: search,
            },
          },
        },
        {
          category: {
            author: {
              name: {
                contains: search,
              },
            },
          },
        },
      ],
    },
    take: itemsToFetch,
    skip: (page ?? 1 - 1) * itemsToFetch,
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
  return episodes;
};

export const getPrograms = async () => {
  const programs = prisma.category.findMany({
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
  return programs;
};

export const getCount = async (search: string) => {
  const count = await prisma.episode.count({
    where: {
      featured: false,
      title: {
        contains: search,
      },
    },
  });
  return count;
};
