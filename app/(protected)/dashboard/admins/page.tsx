import AdminCard from "@/components/AdminCard";
import AdminForm from "@/components/AdminForm";
import prisma from "@/lib/prisma";
async function page({
  searchParams,
}: {
  searchParams: { search: string; page: string };
}) {
  const { search, page } = searchParams;
  const sk = Number(page) || 1;
  const itemsToShow = 30;
  const admins = await prisma.user.findMany({
    where: {
      name: {
        contains: search,
      },
    },
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
    orderBy: {
      id: "desc",
    },
  });
  return (
    <div>
      <AdminForm />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-5 gap-5">
        {admins.map((admin) => {
          return <AdminCard key={admin.id} admin={admin} />;
        })}
      </div>
    </div>
  );
}

export default page;
