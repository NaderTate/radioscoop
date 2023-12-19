"use server";
import prisma from "@/lib/prisma";

export const getSidePanelPosts = async () => {
  const posts = await prisma.sideBar.findFirst({
    select: {
      Items: true,
    },
    cacheStrategy: {
      ttl: 60 * 60 * 2,
      swr: 20,
    },
  });
  return posts;
};
1;
