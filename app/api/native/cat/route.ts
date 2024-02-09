import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sk = Number(searchParams.get("page")) || 1;
  const itemsToShow = 20;
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      img: true,
      name: true,
      author: {
        select: {
          name: true,
        },
      },
      month: {
        select: {
          name: true,
          year: {
            select: {
              year: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (sk - 1) * itemsToShow,
    take: itemsToShow,
  });
  const count = await prisma.category.count();
  const pages = Array.from({ length: Math.ceil(count / 20) }, (_, i) => i + 1);
  const pagenatedArray = (arr: Array<number>, p: number) => {
    let newArr: Array<number> = [];
    arr.forEach((element: any) => {
      if (Math.abs(element - p) <= 2) {
        newArr = [...newArr, element];
      }
    });
    return newArr;
  };
  const formattedCategories = categories.map((category) => {
    return {
      ...category,
      _id: category?.id,
      author: category?.author?.map((author) => author?.name).join(", "),
      month: category?.month?.name,
      year: category?.month?.year?.year,
    };
  });
  return NextResponse.json({
    success: true,
    categories: formattedCategories,
    pagenateArr: pagenatedArray(pages, sk),
    pages,
  });
}
