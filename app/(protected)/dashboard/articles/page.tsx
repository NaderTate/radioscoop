import ArticlesTable from "@/components/ArticlesTable";
import Pagination from "@/components/Pagination";
import SearchForm from "@/components/SearchForm";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { pagination } from "@/lib/utils";
async function page({
  searchParams,
}: {
  searchParams: { search: string; page: string };
}) {
  const { search, page } = searchParams;
  const sk = Number(page) || 1;
  const itemsToShow = 30;
  const articles = await prisma.post.findMany({
    where: {
      title: {
        contains: search,
      },
    },
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
    orderBy: {
      id: "desc",
    },
    include: {
      presenter: { select: { label: true } },
    },
  });
  const count = await prisma.post.count({
    where: {
      title: {
        contains: search,
      },
    },
  });
  const { Arr, pages } = pagination(count, sk, itemsToShow);
  return (
    <div>
      <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
        <Button className="my-3">
          <a href="/dashboard/features/create">إضافة مقالة</a>
        </Button>
        <SearchForm content="articles" />
      </div>
      <ArticlesTable data={articles} />
      <Pagination Arr={Arr} pages={pages} link="/dashboard/articles" />
    </div>
  );
}

export default page;
