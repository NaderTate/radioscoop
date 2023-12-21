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

export const createProgram = async (programData: {
  name: string;
  img: string;
  authorId: string | null | undefined;
}) => {
  const program = await prisma.category.create({
    data: {
      name: programData.name,
      img: programData.img,
      author: programData.authorId
        ? {
            connect: {
              id: programData.authorId,
            },
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
    authorId: string | null | undefined;
  }
) => {
  const program = await prisma.category.update({
    where: { id },
    data: {
      name: programData.name,
      img: programData.img,
      author: programData.authorId
        ? { connect: { id: programData.authorId } }
        : undefined,
    },
  });
  revalidatePath("/dashboard/programs");
  return program;
};
