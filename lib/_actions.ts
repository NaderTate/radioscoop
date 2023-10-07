"use server";
import prisma from "./prisma";
// create episode
export const createEpisode = async (data: {
  title: string;
  img: string;
  link: string;
}) => {
  const episode = await prisma.episode.create({
    data,
  });
  return episode;
};
// delete episode
export const deleteEpisode = async (id: string) => {
  const episode = await prisma.episode.delete({
    where: { id },
  });
  return episode;
};
