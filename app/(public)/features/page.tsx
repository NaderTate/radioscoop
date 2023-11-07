import Pagination from "../../../components/Pagination";
import prisma from "@/lib/prisma";
import { pagination } from "@/lib/utils";
async function page({
  searchParams,
}: {
  searchParams: {
    page: string;
    type?: string;
  };
}) {
  const { page, type } = searchParams;
  const sk = Number(page) || 1;
  const itemsToShow = 30;

  const features = await prisma.episode.findMany({
    where: {
      featured: true,
      typeId: type ? type : undefined,
    },
    include: {
      presenter: { select: { name: true } },
      preparedBy: { select: { name: true } },
    },
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
    orderBy: {
      id: "desc",
    },
  });
  const count = await prisma.episode.count({
    where: {
      featured: true,
      typeId: type ? type : undefined,
    },
  });
  const { Arr, pages } = pagination(count, sk, itemsToShow);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 px-4">
        {features.map((feature) => (
          <div key={feature.id} className="flex flex-col relative">
            <a href={`/ep/${feature.id}`}>
              <img
                className="shadow-md shadow-indigo-300/50 rounded-md  brightness-[.6]"
                src={feature.img || ""}
                alt=""
              />
            </a>
            <div className="absolute bottom-12 right-1 font-semibold tracking-wide">
              اعداد {feature.preparedBy?.name}
            </div>
            <div className="absolute bottom-7 right-1 font-semibold tracking-wide">
              تقديم {feature.presenter?.name}
            </div>
            <p className="text-center">{feature.featureTitle}</p>
          </div>
        ))}
      </div>
      <Pagination
        Arr={Arr}
        pages={pages}
        link="/features"
        query={type ? { type: type } : undefined}
        currentPage={sk}
      />
    </div>
  );
}

export default page;
