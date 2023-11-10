import NextUIPagination from "@/components/NextUIPagination";
import ProgramCard from "@/components/ProgramCard";
export const metadata = {
  title: "برامج راديو سكووب",
  description: "برامج راديو سكووب",
};
async function Programs({
  searchParams,
}: {
  searchParams: { page: string; month: string };
}) {
  const { page, month } = searchParams;
  const sk = Number(page) || 1;
  const itemsToShow = 30;
  const monthInfo = await prisma.month.findUnique({
    where: { id: month },
    select: { name: true, year: { select: { year: true } } },
  });
  const programs = await prisma.category.findMany({
    where: {
      monthId: month ? month : undefined,
    },
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
    orderBy: {
      id: "desc",
    },
    include: {
      author: { select: { name: true } },
      month: { select: { name: true, year: { select: { year: true } } } },
    },
  });
  const count = await prisma.category.count({
    where: {
      monthId: month ? month : undefined,
    },
  });
  return (
    <div>
      <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 sm:py-24">
        <div className="max-w-xl mx-auto text-center ">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            برامج موسم {monthInfo?.year.year} / {monthInfo?.name}
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {programs?.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
        <NextUIPagination
          total={Math.ceil(count / itemsToShow)}
          queries={["month"]}
        />
      </div>
    </div>
  );
}

export default Programs;
