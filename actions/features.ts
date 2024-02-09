"use server";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export const createFeature = async (featureData: {
  featureTitle: string | null;
  img: string | null;
  link?: string;
  preparedById: string | null;
  presenterId: string | null;
  typeId?: string | null;
  embedLink?: string | null;
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
        link: featureData.link ?? "",
        img: featureData.img,
        embedLink: featureData.embedLink,
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
    link?: string;
    preparedById: string | null;
    presenterId: string | null;
    typeId?: string | null;
    embedLink?: string | null;
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
        link: featureData.link ?? "",
        img: featureData.img,
        embedLink: featureData.embedLink,
      },
    });
    revalidatePath("/dashboard/features");

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

// delete feature
export const deleteFeature = async (featureId: string) => {
  const feature = await prisma.episode.delete({
    where: { id: featureId },
  });
  revalidatePath("/dashboard/features");
  return feature;
};

// add feature type
export const addFeatureType = async (name: string) => {
  const type = await prisma.featureType.create({
    data: {
      name,
    },
  });
  revalidatePath("/dashboard/features");
  return type;
};
