"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
// create episode
export const createEpisode = async (
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

// update episode
export const updateEpisode = async (
  id: string,
  title: string,
  link: string,
  programId: string
) => {
  const episode = await prisma.episode.update({
    where: { id },
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
// add new postmonth
export const addPostMonth = async (name: string, yearId: string) => {
  const month = await prisma.year.update({
    where: { id: yearId },
    data: {
      postMonth: {
        create: {
          name,
        },
      },
    },
  });
  revalidatePath("/dashboard/articles");
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

// add new author
export const addAuthor = async (name: string, img?: string) => {
  // check if another author with the same name exists
  const existingAuthor = await prisma.author.findFirst({
    where: { name },
  });
  if (existingAuthor) {
    return { error: ` يوجد مذيع آخر بنفس الاسم: ${name}` };
  }
  await prisma.author.create({
    data: {
      name,
      img,
    },
  });
  revalidatePath("/dashboard/presenters");
  return { success: true };
};
// update author
export const updateAuthor = async (
  authorId: string,
  name: string,
  img?: string
) => {
  // check if another author with the same name exists
  const existingAuthor = await prisma.author.findFirst({
    where: { name },
  });
  if (existingAuthor) {
    return { error: ` يوجد مذيع آخر بنفس الاسم: ${name}` };
  }
  await prisma.author.update({
    where: { id: authorId },
    data: {
      name,
      img,
    },
  });
  revalidatePath("/dashboard/presenters");
  return { success: true };
};
// delete author
export const deleteAuthor = async (authorId: string) => {
  const author = await prisma.author.delete({
    where: { id: authorId },
  });
  revalidatePath("/dashboard/presenters");
  return author;
};
// add new program
export const createProgram = async (
  name: string,
  img: string,
  presenterId: string
) => {
  const program = await prisma.category.create({
    data: {
      name,
      img,
      author: {
        connect: {
          id: presenterId,
        },
      },
    },
  });
  revalidatePath("/dashboard/programs");
  return program;
};
// update program
export const updateProgram = async (
  programId: string,
  name: string,
  img: string,
  presenterId: string
) => {
  const program = await prisma.category.update({
    where: { id: programId },
    data: {
      name,
      img,
      author: {
        connect: {
          id: presenterId,
        },
      },
    },
  });
  revalidatePath("/dashboard/programs");
  return program;
};
// delete program
export const deletePrograms = async (programId: string) => {
  const program = await prisma.category.delete({
    where: { id: programId },
  });
  revalidatePath("/dashboard/programs");
  return program;
};
// delete admin
export const deleteAdmin = async (adminId: string) => {
  await prisma.user.delete({
    where: { id: adminId },
  });
  revalidatePath("/dashboard/admins");
};
// add admin
export const addAdmin = async (name: string, email: string) => {
  const admin = await prisma.user.findFirst({
    where: { email },
  });
  if (admin) {
    return { error: "هذا البريد الإلكتروني موجود بالفعل" };
  }
  await prisma.user.create({
    data: {
      email,
      name,
      image: "",
    },
  });
  revalidatePath("/dashboard/admins");
  return { success: true };
};
// add video
export const addVideo = async (
  title: string,
  link: string,
  image: string,
  authorId: string
) => {
  const video = await prisma.video.create({
    data: {
      title,
      link,
      image,
      presenter: {
        connect: {
          id: authorId,
        },
      },
    },
  });
  revalidatePath("/dashboard/media-scoop");
  return video;
};
// update video
export const updateVideo = async (
  videoId: string,
  title: string,
  link: string,
  image: string,
  authorId: string
) => {
  const video = await prisma.video.update({
    where: { id: videoId },
    data: {
      title,
      link,
      image,
      presenter: {
        connect: {
          id: authorId,
        },
      },
    },
  });
  revalidatePath("/dashboard/media-scoop");
  return video;
};
// delete video
export const deleteVideo = async (videoId: string) => {
  const video = await prisma.video.delete({
    where: { id: videoId },
  });
  revalidatePath("/dashboard/media-scoop");
  return video;
};
// add article
export const addArticle = async (
  title: string,
  image: string,
  content: string,
  authorId: string,
  typeId: string,
  monthId: string
) => {
  const article = await prisma.post.create({
    data: {
      title,
      content,
      image,
      presenter: {
        connect: {
          id: authorId,
        },
      },
      type: {
        connect: {
          id: typeId,
        },
      },
      PostMonth: {
        connect: {
          id: monthId,
        },
      },
    },
  });
  revalidatePath("/dashboard/articles");
  return article;
};
// update article
export const updateArticle = async (
  articleId: string,
  title: string,
  image: string,
  content: string,
  authorId: string,
  typeId: string,
  monthId: string
) => {
  const article = await prisma.post.update({
    where: { id: articleId },
    data: {
      title,
      content,
      image,
      presenter: {
        connect: {
          id: authorId,
        },
      },
      type: {
        connect: {
          id: typeId,
        },
      },
      PostMonth: {
        connect: {
          id: monthId,
        },
      },
    },
  });
  revalidatePath("/dashboard/articles");
  return article;
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
export const addType = async (name: string) => {
  const type = await prisma.type.create({
    data: {
      name,
    },
  });
  revalidatePath("/dashboard/articles");
  return type;
};
