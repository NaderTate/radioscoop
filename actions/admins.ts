"use server";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export const createNewAdmin = async (adminData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    await prisma.admin.create({
      data: {
        ...adminData,
      },
    });
    revalidatePath("/dashboard/admins");
    return { success: true };
  } catch (error) {
    return { error: "حدث خطأ ما" };
  }
};

export const updateAdmin = async (
  id: string,
  adminData: {
    name: string;
    email: string;
    password: string;
  }
) => {
  try {
    await prisma.admin.update({
      where: { id },
      data: {
        ...adminData,
      },
    });
    revalidatePath("/dashboard/admins");
    return { success: true };
  } catch (error) {
    return { error: "حدث خطأ ما" };
  }
};

export const deleteAdmin = async (id: string) => {
  try {
    await prisma.admin.delete({
      where: { id },
    });
    revalidatePath("/dashboard/admins");
    return { success: true };
  } catch (error) {
    return { error: "حدث خطأ ما" };
  }
};
