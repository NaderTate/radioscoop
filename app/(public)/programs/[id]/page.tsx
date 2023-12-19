import prisma from "@/lib/prisma";

import Link from "next/link";

import EpisodeCard from "@/components/EpisodeCard";
import Pagination from "@/components/Pagination";

type Props = {
  params: { id: string };
  searchParams: { page: string };
};

export async function generateMetadata({ params }: Props) {
  try {
    const program = await prisma.category.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        img: true,
      },
    });
    if (!program)
      return { title: "لا يوجد", description: "هذا البرنامج غير موجود" };
    return {
      title: `برنامج ${program?.name}`,
      description:
        "راديو سكوب : اول راديو في مصر بنقل المتميزين من متتدربيه للاذاعات الكبرى اف ام  في مصر يمكن التواصل من خلال واتساب فيسبوك تويتر او انستاجرام او من خلال رقم الهاتف الجوال FM الكبرى",
      alternates: {
        canonical: `ep/${program?.id}`,
      },
      twitter: {
        card: "summary_large_image",
        site: "@radioscoop",
        title: `برنامج ${program?.name}`,
        description:
          "راديو سكوب : اول راديو في مصر بنقل المتميزين من متتدربيه للاذاعات الكبرى اف ام  في مصر يمكن التواصل من خلال واتساب فيسبوك تويتر او انستاجرام او من خلال رقم الهاتف الجوال FM الكبرى",
        images: [program.img || "/logo.png"],
      },
      openGraph: {
        title: `برنامج ${program?.name}`,
        images: [
          {
            url: program.img || "/logo.png",
            width: 800,
            height: 800,
          },
        ],
      },
    };
  } catch (error) {
    return { title: "لا يوجد", description: "هذا البرنامج غير موجود" };
  }
}

async function Program({ params: { id }, searchParams }: Props) {
  const { page } = searchParams;
  const pageNumber = Number(page) || 1;
  const itemsToShow = 30;

  const program = await prisma.category.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      author: { select: { name: true, id: true } },
      month: {
        select: { name: true, year: { select: { year: true } } },
      },
    },
  });

  const episodes = await prisma.episode.findMany({
    where: {
      featured: false,
      categoryId: id,
    },
    include: {
      category: {
        select: {
          name: true,
          img: true,
          author: { select: { name: true } },
          month: {
            select: { name: true, year: { select: { year: true } } },
          },
        },
      },
    },
    take: itemsToShow,
    skip: (pageNumber - 1) * itemsToShow,
    orderBy: {
      id: "desc",
    },
  });

  const count = await prisma.episode.count({
    where: {
      featured: false,

      categoryId: id,
    },
  });

  return (
    <>
      <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 sm:py-20">
        <div className="max-w-xl mx-auto text-center ">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            برنامج {program?.name}
          </h2>
          {program?.author?.name && (
            <div>
              تقديم :{" "}
              <Link
                href={{ pathname: `/announcers/${program?.author?.id}` }}
                className="text-center my-4 underline"
              >
                {program?.author?.name}
              </Link>
            </div>
          )}
          {program?.month?.name && program.month.year.year && (
            <p className="text-sm my-4">
              {program?.month?.year.year} / {program?.month?.name}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {episodes?.map((episode) => (
            <EpisodeCard key={episode.id} ep={episode} />
          ))}
        </div>
        <Pagination total={Math.ceil(count / itemsToShow)} />
      </div>
    </>
  );
}
export default Program;
