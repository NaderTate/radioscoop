"use server";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export const addVideo = async (videoData: {
  title: string;
  link: string;
  image: string;
  announcerId: string | null;
}) => {
  try {
    await prisma.video.create({
      data: {
        title: videoData.title,
        link: videoData.link,
        image: videoData.image,
        presenter: videoData.announcerId
          ? {
              connect: {
                id: videoData.announcerId,
              },
            }
          : undefined,
      },
    });
    revalidatePath("/dashboard/media-scoop");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const updateVideo = async (
  id: string,
  videoData: {
    title: string;
    link: string;
    image: string;
    announcerId?: string | null;
  }
) => {
  try {
    await prisma.video.update({
      where: {
        id,
      },
      data: {
        title: videoData.title,
        link: videoData.link,
        image: videoData.image,
        presenter: videoData.announcerId
          ? {
              connect: {
                id: videoData.announcerId,
              },
            }
          : undefined,
      },
    });
    revalidatePath("/dashboard/media-scoop");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

// delete video
export const deleteVideo = async (videoId: string) => {
  const video = await prisma.video.delete({
    where: { id: videoId },
  });
  revalidatePath("/dashboard/media-scoop");
  return video;
};
