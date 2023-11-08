import NextUIPagination from "@/components/NextUIPagination";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
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
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 mt-10">
        {articles.map((article) => (
          <div className="flex flex-col" key={article.id}>
            <Link href={{ pathname: `/articles/${article.id}` }}>
              <img
                src={article.image}
                alt=""
                className="object-cover h-64 w-48 m-auto rounded-md"
              />
            </Link>
            <p className="text-center">{article.title}</p>
          </div>
        ))}
      </div>

      <NextUIPagination
        total={Math.floor(count / itemsToShow)}
        queries={["type", "month"]}
      />
    </div>
  );
}

export default page;
