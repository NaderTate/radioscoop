"use server";
import { revalidatePath } from "next/cache";
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
  revalidatePath("/dashboard/episodes");
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

// Add new month to year
export const addMonth = async (yearId: string, name: string) => {
  const month = await prisma.year.update({
    where: { id: yearId },
    data: {
      months: {
        create: {
          name: name,
        },
      },
    },
  });
  revalidatePath("/dashboard/seasons");
  return month;
};
// update month
export const updateMonth = async (
  monthId: string,
  name: string,
  prgramId: string[]
) => {
  const month = await prisma.month.update({
    where: { id: monthId },
    data: {
      name,
      categories: {
        set: [],
        connect: prgramId.map((id) => ({ id })),
      },
    },
  });
  revalidatePath("/dashboard/seasons");
  return month;
};
// add new year
export const addYear = async (name: string) => {
  const year = await prisma.year.create({
    data: {
      year: name,
    },
  });
  revalidatePath("/dashboard/seasons");
  return year;
};
// add a program to a certain month
export const addProgram = async (monthId: string, prgramId: string[]) => {
  const program = await prisma.month.update({
    where: { id: monthId },
    data: {
      categories: {
        connect: prgramId.map((id) => ({ id })),
      },
    },
  });
  revalidatePath("/dashboard/seasons");
  return program;
};
// update year
export const updateYear = async (yearId: string, name: string) => {
  const year = await prisma.year.update({
    where: { id: yearId },
    data: {
      year: name,
    },
  });
  revalidatePath("/dashboard/seasons");
  return year;
};
// delete year
export const deleteYear = async (yearId: string) => {
  const year = await prisma.year.delete({
    where: { id: yearId },
  });
  revalidatePath("/dashboard/seasons");
  return year;
};
// delete month
export const deleteMonth = async (monthId: string) => {
  const month = await prisma.month.delete({
    where: { id: monthId },
  });
  revalidatePath("/dashboard/seasons");
  return month;
};
// delete program
export const deleteProgram = async (programId: string) => {
  const program = await prisma.category.delete({
    where: { id: programId },
  });
  revalidatePath("/dashboard/seasons");
  return program;
};
// create new episode
export const createNewEpisode = async (
  title: string,
  link: string,
  programId: string
) => {
  const episode = await prisma.episode.create({
    data: {
      title,
      link,
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
