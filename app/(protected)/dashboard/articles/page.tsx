import prisma from "@/lib/prisma";

import Pagination from "@/components/Pagination";
import ArticleForm from "@/components/ArticleForm";
import ArticlesTable from "@/components/ArticlesTable";
import SearchInput from "@/components/dashboard/SearchInput";

type Props = {
  searchParams: { search: string; page: number };
};

async function page({ searchParams }: Props) {
  const { search, page } = searchParams;
  const itemsToShow = 30;

  const articles = await prisma.post.findMany({
    where: {
      title: {
        contains: search,
      },
    },
    take: itemsToShow,
    skip: ((page ?? 1) - 1) * itemsToShow,
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
    <div className="flex flex-col min-h-[90vh]">
      <div className="grow">
        <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
          <ArticleForm
            years={years}
            postMonths={postMonths}
            types={types}
            presenters={presenters}
          />
          <SearchInput />
        </div>
        <ArticlesTable
          years={years}
          postMonths={postMonths}
          types={types}
          presenters={presenters}
          data={articles}
        />
      </div>
      <Pagination
        currentPage={page}
        total={Math.ceil(count / itemsToShow)}
        queries={{ search }}
      />
    </div>
  );
}

export default page;
