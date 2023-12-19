"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// create episode
export const createEpisode = async (
  title: string,
  link: string,
  programId: string
) => {
  const AudioDriveLink = (url: string) => {
    let arr = url.split("/");
    let updatedLink = [
      arr[0],
      "//",
      arr[2],
      "/",
      "uc?export=open&id=",
      arr[5],
    ].join("");
    return updatedLink;
  };
  const episode = await prisma.episode.create({
    data: {
      title,
      link: AudioDriveLink(link),
      category: {
        connect: {
          id: programId,
        },
      },
    },
  });
  revalidatePath("/dashboard/episodes");
  return episode;
};
