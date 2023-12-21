"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const addAnnouncer = async (announcerData: {
  name: string;
  img?: string;
}) => {
  try {
    await prisma.author.create({
      data: announcerData,
    });
    revalidatePath("/dashboard/announcers");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const updateAnnouncer = async (
  id: string,
  announcerData: { name: string; img?: string }
) => {
  try {
    await prisma.author.update({
      where: { id },
      data: announcerData,
    });
    revalidatePath("/dashboard/announcers");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const deleteAnnouncer = async (id: string) => {
  try {
    await prisma.author.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
