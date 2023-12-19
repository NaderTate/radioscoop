import prisma from "@/lib/prisma";

import AdminCard from "./_components/AdminCard";
import AdminForm from "./_components/AdminForm";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/dashboard/SearchInput";

type Props = {
  searchParams: { search: string; page: number };
};

async function page({ searchParams }: Props) {
  const { search, page } = searchParams;
  const itemsToShow = 30;

  const admins = await prisma.admin.findMany({
    where: {
      name: {
        contains: search,
      },
    },
    take: itemsToShow,
    skip: ((page ?? 1) - 1) * itemsToShow,
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
      <Pagination
        currentPage={page}
        total={Math.ceil(count / itemsToShow)}
        queries={{ search }}
      />
    </div>
  );
}

export default page;
