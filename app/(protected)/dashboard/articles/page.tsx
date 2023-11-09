import ArticleForm from "@/components/ArticleForm";
import ArticlesTable from "@/components/ArticlesTable";
import NextUIPagination from "@/components/NextUIPagination";
import Pagination from "@/components/Pagination";
import SearchForm from "@/components/SearchForm";
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
      presenter: { select: { name: true } },
      type: { select: { name: true } },
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
  const presenters = await prisma.author.findMany({
    select: { id: true, name: true },
    orderBy: { id: "desc" },
  });
  const types = await prisma.type.findMany({
    select: { id: true, name: true },
    orderBy: { id: "desc" },
  });
  const postMonths = await prisma.postMonth.findMany({
    select: { id: true, name: true, year: { select: { year: true } } },
    orderBy: { id: "desc" },
  });
  const years = await prisma.year.findMany({
    select: { id: true, year: true },
    orderBy: { id: "desc" },
  });
  return (
    <div>
      <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
        <ArticleForm
          years={years}
          postMonths={postMonths}
          types={types}
          presenters={presenters}
        />
        <SearchForm content="articles" />
      </div>
      <ArticlesTable
        years={years}
        postMonths={postMonths}
        types={types}
        presenters={presenters}
        data={articles}
      />
      <NextUIPagination
        total={Math.ceil(count / itemsToShow)}
        queries={["search"]}
      />
    </div>
  );
}

export default page;
