import NextUIPagination from "@/components/NextUIPagination";
import prisma from "@/lib/prisma";
import { Image } from "@nextui-org/image";
import Link from "next/link";
export const revalidate = 60;

export const metadata = {
  title: "المقالات",
  description: "مقالات راديو سكووب",
};
async function page({
  searchParams,
}: {
  searchParams: {
    page: string;
    type?: string;
    month?: string;
  };
}) {
  const { page, type, month } = searchParams;
  const sk = Number(page) || 1;
  const itemsToShow = 30;
  const articles = await prisma.post.findMany({
    where: {
      typeId: type ? type : undefined,
      postMonthId: month ? month : undefined,
    },
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
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
    <div className="p-5">
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

      <NextUIPagination
        total={Math.ceil(count / itemsToShow)}
        queries={["type", "month"]}
      />
    </div>
  );
}

export default page;
