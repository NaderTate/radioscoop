"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

// update month
export const updateMonth = async (
  monthId: string,
  monthData: {
    name: string;
    prgramsIDs: string[];
  }
) => {
  await prisma.month.update({
    where: { id: monthId },
    data: {
      categories: {
        set: [],
      },
    },
  });
  const month = await prisma.month.update({
    where: { id: monthId },
    data: {
      name: monthData.name,
      categories: {
        connect: monthData.prgramsIDs.map((id) => ({ id })),
      },
    },
  });
  revalidatePath("/dashboard/seasons");
  return month;
};

// delete month
export const deleteMonth = async (monthId: string) => {
  const month = await prisma.month.delete({
    where: { id: monthId },
  });
  revalidatePath("/dashboard/seasons");
  return month;
};
