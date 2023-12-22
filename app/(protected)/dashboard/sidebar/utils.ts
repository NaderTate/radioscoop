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

// update the sidebar items by receiving a list of IDs and making a relation between the posts and the sidebar
export const updateSidebar = async (
  data: { id: string; image: string; title: string }[]
) => {
  await prisma.sideBar.deleteMany();

  await prisma.sideBar.create({
    data: {
      Items: data,
    },
  });
};
