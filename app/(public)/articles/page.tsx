import Pagination from "../../../components/Pagination";
import prisma from "@/lib/prisma";
import { pagination } from "@/lib/utils";
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
      type: type ? type : undefined,
      month: month ? month : undefined,
    },
    take: 20,
    orderBy: {
      id: "desc",
    },
    include: { author: { select: { name: true } } },
  });
  const count = await prisma.post.count({
    where: {
      type: type ? type : undefined,
      month: month ? month : undefined,
    },
  });
  const { Arr, pages } = pagination(count, sk, itemsToShow);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 mt-10">
        {articles.map((article) => (
          <div className="flex flex-col" key={article.id}>
            <a href={`/poem/${article.id}`}>
              <img
                src={article.image}
                alt=""
                className="object-cover h-64 w-48 m-auto rounded-md"
              />
            </a>
            <p className="text-center">{article.title}</p>
          </div>
        ))}
      </div>
      <Pagination
        Arr={Arr}
        pages={pages}
        link="/articles"
        query={{ type, month }}
      />
    </div>
  );
}

export default page;