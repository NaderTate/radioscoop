import prisma from "@/lib/prisma";
import Pagination from "@/components/Pagination";
import PromoForm from "./_components/promo-form";
import PromosTable from "./_components/promos-table";
import SearchInput from "@/components/dashboard/SearchInput";
import { itemsToFetch } from "@/lib/globals";

type Props = {
  searchParams: { search: string; page: number };
};

async function PromosPage({ searchParams }: Props) {
  const { search, page } = searchParams;

  const promos = await prisma.promo.findMany({
    where: {
      link: {
        contains: search,
        mode: "insensitive",
      },
    },
    take: itemsToFetch,
    skip: ((page ?? 1) - 1) * itemsToFetch,
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
      link: true,
      image: true,
      category: {
        select: {
          id: true,
          name: true,
          img: true,
        },
      },
      presenters: {
        select: {
          presenter: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      createdAt: true,
    },
  });

  const count = await prisma.promo.count({
    where: {
      link: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  // Fetch categories to be used as "programs" in the PromoForm
  const programs = await prisma.category.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
      month: { select: { name: true, year: { select: { year: true } } } },
    },
    orderBy: {
      id: "desc",
    },
  });

  const presenters = await prisma.author.findMany({
    select: { id: true, name: true },
    orderBy: { id: "desc" },
  });

  return (
    <div className="flex flex-col min-h-[90vh]">
      <div className="grow">
        <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
          <PromoForm programs={programs} presenters={presenters} />
          <SearchInput />
        </div>
        <PromosTable
          programs={programs}
          data={promos}
          presenters={presenters}
        />
      </div>
      <Pagination currentPage={page} total={count} queries={{ search }} />
    </div>
  );
}

export default PromosPage;
