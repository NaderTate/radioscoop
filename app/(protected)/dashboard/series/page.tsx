import Pagination from "@/components/Pagination";
import ProgramCard from "@/components/ProgramCard";
import prisma from "@/lib/prisma";
import AddProgramForm from "./AddProgramForm";
async function Seriess({ searchParams }: { searchParams: { page: string } }) {
  const sk = Number(searchParams.page) || 1;
  const itemsPerPage = 30;
  const programs = await prisma.category.findMany({
    where: {
      series: true,
    },
    take: itemsPerPage,
    skip: (sk - 1) * itemsPerPage,
    include: {
      author: { select: { name: true } },
      month: { select: { name: true, year: { select: { year: true } } } },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  const count = await prisma.category.count({
    where: {
      series: true,
    },
  });
  return (
    <div>
      <div className="flex justify-center ">
        <AddProgramForm />
      </div>
      {programs.length > 0 ? (
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">مسلسلات FM</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {programs?.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            لا يوجد مسلسلات
          </h2>
        </div>
      )}
      <Pagination total={Math.ceil(count / itemsPerPage)} />
    </div>
  );
}

export default Seriess;
