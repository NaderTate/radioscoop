import prisma from "@/lib/prisma";

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
