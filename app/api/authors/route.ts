import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const allEpisodes = await prisma.episode.findMany({
    where: { categoryy: "ادم و حياة" },
    orderBy: { id: "desc" },
  });
  const allCategories = await prisma.category.findMany({});

  // Use Promise.all with map to wait for all promises to resolve
  // await Promise.all(
  //   allEpisodes.map(async (episode) => {
  //     return Promise.all(
  //       allCategories.map(async (category) => {
  //         if (episode.categoryy) {
  //           if (episode.categoryy === category.name) {
  //             const res = await prisma.episode.update({
  //               where: { id: episode.id },
  //               data: { categoryId: category.id },
  //             });
  //             console.log(res);
  //           }
  //         }
  //       })
  //     );
  //   })
  // );

  return NextResponse.json({});
}
