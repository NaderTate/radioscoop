"use server";

import prisma from "@/lib/prisma";

export const getFeatureTypes = async () => {
  const featureTypes = await prisma.featureType.findMany({
    select: {
      name: true,
      id: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return featureTypes;
};
export const getSeasons = async () => {
  const seasons = await prisma.year.findMany({
    select: {
      year: true,
      months: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  return seasons;
};
export const getArticleTypes = async () => {
  const articleTypes = await prisma.type.findMany({
    select: {
      name: true,
      id: true,
      posts: {
        select: {
          PostMonth: {
            select: {
              name: true,
              id: true,
              year: {
                select: {
                  year: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // format the array so that I get the following:
  // name, id, the years and the months of each year
  const FormattedArticleTypes = articleTypes.map((item) => {
    const postsMap: { [key: number]: { id: string; name: string }[] } = {};

    item.posts.forEach((post: any) => {
      const year = post.PostMonth.year.year;
      const month = post.PostMonth;

      if (!postsMap[year]) {
        postsMap[year] = [{ name: month.name, id: month.id }];
      } else if (postsMap[year].find((item) => item.id === month.id)) {
        return;
      } else {
        postsMap[year].push({ name: month.name, id: month.id });
      }
    });

    const formattedPosts = Object.keys(postsMap).map((year: any) => {
      return {
        year: parseInt(year),
        months: postsMap[year],
      };
    });

    return {
      name: item.name,
      id: item.id,
      seasons: formattedPosts,
    };
  });
  return FormattedArticleTypes;
};

export const getSeries = async () => {
  const series = await prisma.category.findMany({
    where: { series: true },
    orderBy: { id: "desc" },
    select: {
      name: true,
      id: true,
    },
  });
  return series;
};

export const getPromos = async () => {
  const promos = await prisma.promo.findMany({
    distinct: ["categoryId"],
    select: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return promos;
};

// search programs and authors
export const search = async (searchQuery: string) => {
  const programs = await prisma.category.findMany({
    where: { name: { contains: searchQuery, mode: "insensitive" } },
    select: {
      name: true,
      id: true,
      img: true,
    },
    take: 6,
    orderBy: {
      id: "desc",
    },
  });
  const authors = await prisma.author.findMany({
    where: { name: { contains: searchQuery, mode: "insensitive" } },
    take: 6,
    orderBy: {
      id: "desc",
    },
  });
  return {
    programs,
    authors,
  };
};
