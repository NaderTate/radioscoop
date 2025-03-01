"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get promos based on a search query (searching in the promo link)
export const getPromos = async (searchQuery: string) => {
  const promos = await prisma.promo.findMany({
    select: {
      id: true,
      link: true,
      image: true,
      category: {
        select: {
          id: true,
          name: true,
          img: true,
        },
      },
      presenters: {
        select: {
          presenter: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return promos;
};

// Create a new promo. Expects the promo data including:
// - link: promo link,
// - img: promo image URL,
// - categoryId: the ID of the related Category (program),
// - presenterIds: an array of Author IDs for the presenters.
export const createPromo = async (promoData: {
  link: string;
  img?: string;
  categoryId: string;
  presenterIds: string[];
}) => {
  const promo = await prisma.promo.create({
    data: {
      link: promoData.link,
      image: promoData.img ? promoData.img : undefined,
      category: {
        connect: { id: promoData.categoryId },
      },
      presenters: {
        // Create join entries for each presenter
        create: promoData.presenterIds.map((presenterId) => ({
          presenter: { connect: { id: presenterId } },
        })),
      },
    },
  });
  revalidatePath("/dashboard/promos");
  return promo;
};

// Update an existing promo.
// This first updates the promo's main fields, then deletes its existing join entries,
// and finally recreates them based on the provided presenterIds.
export const updatePromo = async (
  id: string,
  promoData: {
    link: string;
    img?: string;
    categoryId: string;
    presenterIds: string[];
  }
) => {
  const promo = await prisma.$transaction(async (tx) => {
    // Update the main promo fields.
    const updatedPromo = await tx.promo.update({
      where: { id },
      data: {
        link: promoData.link,
        image: promoData.img ? promoData.img : undefined,
        category: { connect: { id: promoData.categoryId } },
      },
    });

    // Remove all existing join entries for this promo.
    await tx.promoPresenter.deleteMany({
      where: { promoId: id },
    });

    // Create new join entries for each presenter.
    if (promoData.presenterIds.length > 0) {
      await tx.promoPresenter.createMany({
        data: promoData.presenterIds.map((presenterId) => ({
          promoId: id,
          presenterId,
        })),
      });
    }
    return updatedPromo;
  });
  revalidatePath("/dashboard/promos");
  return promo;
};

// Delete a promo.
// First remove any join entries (PromoPresenter records) for the promo,
// then delete the promo record itself.
export const deletePromo = async (promoId: string) => {
  await prisma.promoPresenter.deleteMany({
    where: { promoId },
  });
  const promo = await prisma.promo.delete({
    where: { id: promoId },
  });
  revalidatePath("/dashboard/promos");
  return promo;
};
