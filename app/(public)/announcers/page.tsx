import AnnouncerCard from "@/components/AnnouncerCard";
import NextUIPagination from "@/components/NextUIPagination";
import prisma from "@/lib/prisma";
export const revalidate = 60;

export const metadata = {
  title: "المذيعون",
  description: "مذيعون راديو سكووب",
};
async function Announcers({
  searchParams,
}: {
  searchParams: { page: string; search: string };
}) {
  const { page, search } = searchParams;
  const itemsToShow = 30;
  const sk = Number(page) || 1;
  const announcers = await prisma.author.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          Categories: {
            some: {
              name: {
                contains: search,
              },
            },
          },
        },
      ],
    },
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
    orderBy: {
      id: "desc",
    },
  });
  const count = await prisma.author.count({
    where: {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          Categories: {
            some: {
              name: {
                contains: search,
              },
            },
          },
        },
      ],
    },
  });
  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-5 justify-center ">
        {announcers.map((announcer) => {
          return (
            <AnnouncerCard
              key={announcer.id}
              id={announcer.id}
              name={announcer.name}
              img={announcer.img}
            />
          );
        })}
      </div>
      <NextUIPagination
        total={Math.ceil(count / itemsToShow)}
        queries={["search"]}
      />
    </div>
  );
}

export default Announcers;
