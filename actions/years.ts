"use server";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export const addYear = async (name: string) => {
  const year = await prisma.year.create({
    data: {
      year: name,
    },
  });
  revalidatePath("/dashboard/seasons");
  return year;
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
