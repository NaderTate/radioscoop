"use server";

import prisma from "@/lib/prisma";
import { convertDriveLink } from "@/lib/utils";
import { revalidatePath } from "next/cache";

// create episode
export const createEpisode = async (episodeData: {
  title: string;
  link: string;
  embedLink?: string | null;
  programId: string;
}) => {
  const episode = await prisma.episode.create({
    data: {
      title: episodeData.title,
      link: convertDriveLink(episodeData.link),
      embedLink: episodeData.embedLink,
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
    embedLink?: string | null;
    programId: string;
  }
) => {
  const episode = await prisma.episode.update({
    where: {
      id,
    },
    data: {
      title: episodeData.title,
      link: convertDriveLink(episodeData.link),
      embedLink: episodeData.embedLink,
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
