"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// create episode
export const createEpisode = async (episodeData: {
  title: string;
  link: string;
  programId: string;
}) => {
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
      title: episodeData.title,
      link: AudioDriveLink(episodeData.link),
      category: {
        connect: {
          id: episodeData.programId,
        },
      },
    },
  });
  revalidatePath("/dashboard/episodes");
  return episode;
};

export const updateEpisode = async (
  id: string,
  episodeData: {
    title: string;
    link: string;
    programId: string;
  }
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
  const episode = await prisma.episode.update({
    where: {
      id,
    },
    data: {
      title: episodeData.title,
      link: AudioDriveLink(episodeData.link),
      category: {
        connect: {
          id: episodeData.programId,
        },
      },
    },
  });
  revalidatePath("/dashboard/episodes");
  return episode;
};
