"use server";
import prisma from "@/lib/prisma";

import { convertDriveLink } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const createFeature = async (featureData: {
  featureTitle: string | null;
  img: string | null;
  link: string;
  preparedById: string | null;
  presenterId: string | null;
  typeId?: string | null;
}) => {
  try {
    await prisma.episode.create({
      data: {
        featured: true,
        title: "",
        featureTitle: featureData.featureTitle,
        preparedBy: featureData.preparedById
          ? { connect: { id: featureData.preparedById } }
          : undefined,
        presenter: featureData.presenterId
          ? { connect: { id: featureData.presenterId } }
          : undefined,
        type: featureData.typeId
          ? { connect: { id: featureData.typeId } }
          : undefined,
        link: convertDriveLink(featureData.link),
        img: featureData.img,
      },
    });
    revalidatePath("/dashboard/features");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const updateFeature = async (
  id: string,
  featureData: {
    featureTitle: string | null;
    img: string | null;
    link: string;
    preparedById: string | null;
    presenterId: string | null;
    typeId?: string | null;
  }
) => {
  try {
    await prisma.episode.update({
      where: { id },
      data: {
        featured: true,
        title: "",
        featureTitle: featureData.featureTitle,
        preparedBy: featureData.preparedById
          ? { connect: { id: featureData.preparedById } }
          : undefined,
        presenter: featureData.presenterId
          ? { connect: { id: featureData.presenterId } }
          : undefined,
        type: featureData.typeId
          ? { connect: { id: featureData.typeId } }
          : undefined,
        link: convertDriveLink(featureData.link),
        img: featureData.img,
      },
    });
    revalidatePath("/dashboard/features");

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
