"use server";

import prisma from "@/lib/prisma";

export const search = async (e: string) => {
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: e,
          },
        },
        {
          content: {
            contains: e,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
      image: true,
      title: true,
    },
  });
  return posts;
};

export const updateSidebar = async (data: string[]) => {
  const deleteAll = prisma.sideBar.deleteMany();

  const create = prisma.sideBar.create({
    data: {
      Items: data,
    },
  });
  await prisma.$transaction([deleteAll, create]);
};
