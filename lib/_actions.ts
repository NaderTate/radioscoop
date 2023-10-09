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
// update the schedule
export const updateSchedule = async (
  data: {
    id: number;
    name: string;
    images: { id: string; link: string }[];
  }[],
  title: string
) => {
  await prisma.schedule.deleteMany();
  await prisma.schedule.create({
    data: {
      Days: data,
      title,
    },
  });
};
