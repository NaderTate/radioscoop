"use server";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export const getSidePanelArticles = async () => {
  const postsData: { title: string; image: string }[] = [];
  const postsIDs = await prisma.sideBar.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      Items: true,
    },
  });
  if (!postsIDs) return;
  for (const id of postsIDs.Items) {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        image: true,
      },
    });
    post && postsData.push(post);
  }
  return postsData;
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

// delete article
export const deleteArticle = async (articleId: string) => {
  const article = await prisma.post.delete({
    where: { id: articleId },
  });
  revalidatePath("/dashboard/articles");
  return article;
};

// add new type
export const addArticleType = async (name: string) => {
  const type = await prisma.type.create({
    data: {
      name,
    },
  });
  revalidatePath("/dashboard/articles");
  return type;
};

// add new postmonth
export const addArticleMonth = async (monthData: {
  monthName: string;
  yearId: string;
}) => {
  const month = await prisma.year.update({
    where: { id: monthData.yearId },
    data: {
      postMonth: {
        create: {
          name: monthData.monthName,
        },
      },
    },
  });
  revalidatePath("/dashboard/articles");
  return month;
};
