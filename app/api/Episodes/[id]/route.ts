import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const episode = await prisma.episode.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      embedLink: true,
      img: true,
      link: true,
      createdAt: true,
      featured: true,
      featureTitle: true,
      category: {
        select: {
          id: true,
          name: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  const findRelated = async (categoryId: string, episodeId: string) => {
    const checkRelated = await prisma.episode.findMany({
      where: {
        AND: [
          {
            id: {
              not: episodeId,
            },
          },
          {
            category: {
              id: categoryId,
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        img: true,
        link: true,
        createdAt: true,
        featured: true,
        featureTitle: true,
        category: {
          select: {
            name: true,
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    return checkRelated;
  };
  const related = await findRelated(
    episode?.category?.id || "",
    episode?.id || ""
  );
  const formattedEpisode = {
    ...episode,
    _id: episode?.id,
    author: episode?.category?.author
      ?.map((author) => author?.name)
      ?.join(", "),
    date: episode?.createdAt.toDateString(),
    title: episode?.featured ? episode?.featureTitle : episode?.title,
    category: episode?.category?.name,
  };
  const formattedRelated = related.map((episode) => {
    return {
      ...episode,
      _id: episode?.id,
      author: episode?.category?.author
        ?.map((author) => author?.name)
        ?.join(", "),
      date: episode?.createdAt.toDateString(),

      title: episode?.featured ? episode?.featureTitle : episode?.title,
      category: episode?.category?.name,
    };
  });
  return NextResponse.json({
    success: true,
    episode: formattedEpisode,
    related: formattedRelated,
  });
}
