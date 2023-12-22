"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getSidePanelArticles = async () => {
  const posts = await prisma.sideBar.findFirst({
    select: {
      Items: true,
    },
  });
  return posts;
};

export const createNewArticle = async (articleData: {
  title: string;
  content: string;
  image: string;
  presenterId?: string | null;
  typeId?: string | null;
  postMonthId?: string | null;
}) => {
  try {
    await prisma.post.create({
      data: {
        title: articleData.title,
        content: articleData.content,
        image: articleData.image,
        presenter: articleData.presenterId
          ? { connect: { id: articleData.presenterId } }
          : undefined,
        type: articleData.typeId
          ? { connect: { id: articleData.typeId } }
          : undefined,
        PostMonth: articleData.postMonthId
          ? { connect: { id: articleData.postMonthId } }
          : undefined,
      },
    });
    revalidatePath("/articles");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const updateArticle = async (
  id: string,
  articleData: {
    title: string;
    content: string;
    image: string;
    presenterId?: string | null;
    typeId?: string | null;
    postMonthId?: string | null;
  }
) => {
  try {
    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title: articleData.title,
        content: articleData.content,
        image: articleData.image,
        presenter: articleData.presenterId
          ? { connect: { id: articleData.presenterId } }
          : undefined,
        type: articleData.typeId
          ? { connect: { id: articleData.typeId } }
          : undefined,
        PostMonth: articleData.postMonthId
          ? { connect: { id: articleData.postMonthId } }
          : undefined,
      },
    });
    revalidatePath("/articles");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
