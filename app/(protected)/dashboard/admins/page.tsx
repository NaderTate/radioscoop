import prisma from "@/lib/prisma";

import AdminCard from "./_components/AdminCard";
import AdminForm from "./_components/AdminForm";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/dashboard/SearchInput";

import { itemsToFetch } from "@/lib/globals";

type Props = {
  searchParams: { search: string; page: number };
};

async function page({ searchParams }: Props) {
  const { search, page } = searchParams;

  const admins = await prisma.admin.findMany({
    where: {
      name: {
        contains: search,
      },
    },
    take: itemsToFetch,
    skip: ((page ?? 1) - 1) * itemsToFetch,
    orderBy: {
      id: "desc",
    },
  });

  const count = await prisma.admin.count({
    where: {
      name: {
        contains: search,
      },
    },
  });

  return (
    <div className="flex flex-col min-h-[90vh]">
      <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-5">
        <AdminForm />
        <SearchInput />
      </div>
      <div className="grow">
        <div className="flex flex-wrap mt-5 gap-5">
          {admins.map((admin) => {
            return <AdminCard key={admin.id} admin={admin} />;
          })}
        </div>
      </div>
      <Pagination currentPage={page} total={count} queries={{ search }} />
    </div>
  );
}

export default page;
