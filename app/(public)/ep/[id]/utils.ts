"use server";

import prisma from "@/lib/prisma";

export const getEpisodeData = async (id: string) => {
  const episode = await prisma.episode.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      category: {
        select: {
          id: true,
          name: true,
          img: true,
          authorId: true,
          series: true,
        },
      },
      presenter: { select: { name: true } },
      preparedBy: { select: { name: true } },
      featured: true,
      featureTitle: true,
      title: true,
      createdAt: true,
      img: true,
      link: true,
      embedLink: true,
    },
  });

  return episode;
};

export const getRelatedEpisodes = async (
  episodeId: string,
  categoryId: string | null | undefined,
  authorId: string | null | undefined
) => {
  const episodes = await prisma.episode.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              categoryId,
            },
            {
              category: {
                authorId,
              },
            },
          ],
        },
        {
          id: {
            not: episodeId,
          },
        },
      ],
    },
    take: 12,
    orderBy: { createdAt: "desc" },
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
      presenter: { select: { name: true } },
    },
  });
  return episodes;
};
