"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getPrograms = async (searchQuery: string) => {
  const programs = await prisma.category.findMany({
    where: {
      name: {
        contains: searchQuery,
        mode: "insensitive",
      },
    },
    select: {
      name: true,
      id: true,
      img: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  return programs;
};

// add program to general program
export const addGeneralProgram = async (programId: string) => {
  const program = await prisma.category.update({
    where: { id: programId },
    data: {
      generalProgram: true,
    },
  });
  revalidatePath("/dashboard/generalProgram");
  return program;
};

export const removeGeneralProgram = async (programId: string) => {
  const program = await prisma.category.update({
    where: { id: programId },
    data: {
      generalProgram: false,
    },
  });
  revalidatePath("/dashboard/generalProgram");
  return program;
};

export const createProgram = async (programData: {
  name: string;
  img: string;
  authorId: string[] | null | undefined;
}) => {
  const program = await prisma.category.create({
    data: {
      name: programData.name,
      img: programData.img,
      author: programData.authorId
        ? {
            connect: programData.authorId.map((id) => ({ id })),
          }
        : undefined,
    },
  });
  revalidatePath("/dashboard/programs");
  return program;
};

export const updateProgram = async (
  id: string,
  programData: {
    name: string;
    img: string;
    authorId: string[] | null | undefined;
  }
) => {
  const program = await prisma.category.update({
    where: { id },
    data: {
      name: programData.name,
      img: programData.img,
      author: programData.authorId
        ? {
            connect: programData.authorId.map((id) => ({ id })),
          }
        : undefined,
    },
  });
  revalidatePath("/dashboard/programs");
  return program;
};

// delete program
export const deleteProgram = async (programId: string) => {
  const program = await prisma.category.delete({
    where: { id: programId },
  });
  revalidatePath("/dashboard/seasons");
  return program;
};

// Add program to series
export const addProgramToSeries = async (programId: string) => {
  const program = await prisma.category.update({
    where: { id: programId },
    data: {
      series: true,
    },
  });
  revalidatePath("/dashboard/series");
  return program;
};

export const removeProgramFromSeries = async (programId: string) => {
  const program = await prisma.category.update({
    where: { id: programId },
    data: {
      series: false,
    },
  });
  revalidatePath("/dashboard/series");
  return program;
};
