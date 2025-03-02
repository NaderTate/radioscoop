import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const sk = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const program = searchParams.get("program") || "";

  const itemsToShow = 20;

  const filterQuery: { [key: string]: any } = {};
  if (search) {
    filterQuery["category"] = {
      name: {
        contains: search,
        mode: "insensitive",
      },
    };
  }
  if (program) {
    filterQuery["category"] = {
      id: program,
    };
  }

  const episodes = await prisma.episode.findMany({
    where: filterQuery,
    select: {
      id: true,
      embedLink: true,
      title: true,
      img: true,
      link: true,
      createdAt: true,
      featured: true,
      featureTitle: true,
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
    orderBy: {
      createdAt: "desc",
    },
    skip: (sk - 1) * itemsToShow,
    take: itemsToShow,
  });
  const count = await prisma.episode.count({
    where: filterQuery,
  });
  const pages = Array.from({ length: Math.ceil(count / 20) }, (_, i) => i + 1);
  const pagenatedArray = (arr: Array<number>, p: number) => {
    let newArr: Array<number> = [];
    arr.forEach((element: any) => {
      if (Math.abs(element - p) <= 3) {
        newArr = [...newArr, element];
      }
    });
    return newArr;
  };
  const formattedEpisodes = episodes.map((episode) => {
    return {
      ...episode,
      _id: episode?.id,
      title: episode.featured ? 1 : episode?.title,
      img:
        episode.featured || episode.img ? episode.img : episode?.category?.img,
      category: episode.featured
        ? episode.featureTitle
        : episode?.category?.name,
      author: episode?.category?.author
        ?.map((author) => author?.name)
        .join(", "),
      date: episode?.createdAt.toDateString(),
    };
  });
  return NextResponse.json({
    success: true,
    episodes: formattedEpisodes,
    pagenateArr: pagenatedArray(pages, sk),
    pages,
    search,
  });
}
