import prisma from "@/lib/prisma";

import Link from "next/link";
import { Image } from "@nextui-org/image";

import Pagination from "@/components/Pagination";

import { itemsToFetch } from "@/lib/globals";

export const revalidate = 60;

export const metadata = {
  title: "المقالات",
  description: "مقالات راديو سكووب",
};

type Props = {
  searchParams: { page: number; type?: string; month?: string };
};

async function page({ searchParams }: Props) {
  const { page, type, month } = searchParams;
  0;

  const articles = await prisma.post.findMany({
    where: {
      typeId: type ? type : undefined,
      postMonthId: month ? month : undefined,
    },
    take: itemsToFetch,
    skip: ((page ?? 1) - 1) * itemsToFetch,
    orderBy: {
      id: "desc",
    },
    include: {
      presenter: { select: { name: true } },
      type: { select: { name: true } },
    },
  });

  const count = await prisma.post.count({
    where: {
      typeId: type ? type : undefined,
      postMonthId: month ? month : undefined,
    },
  });

  return (
    <div className="p-5 flex flex-col min-h-[90vh]">
      <div className="grow">
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          {articles.map((article) => (
            <div key={article.id} className="w-52">
              <Link href={{ pathname: `/articles/${article.id}` }}>
                <Image
                  width={210}
                  height={210}
                  src={article.image}
                  alt=""
                  className="object-cover aspect-[9/16]  m-auto rounded-md rounded-b-none"
                />
              </Link>
              <div className="bg-gray-900 p-4 rounded-b-md">
                <p className="text-center text-gray-300 line-clamp-2">
                  {article.title}
                </p>
                {article.presenter?.name && (
                  <h5 className="text-sm text-gray-500 text-center">
                    بقلم: {article.presenter?.name}
                  </h5>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination currentPage={page} total={count} queries={{ type, month }} />
    </div>
  );
}

export default page;
