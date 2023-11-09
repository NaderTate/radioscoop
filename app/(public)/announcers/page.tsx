import NextUIPagination from "@/components/NextUIPagination";
import prisma from "@/lib/prisma";
import { Image } from "@nextui-org/image";
import Link from "next/link";
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
    <div>
      <div className="flex flex-wrap gap-5">
        {announcers.map((announcer) => {
          return (
            <Link
              key={announcer.id}
              href={{ pathname: `/announcers/${announcer.id}` }}
            >
              <Image
                width={135}
                height={135}
                className="object-contain rounded-md"
                src={
                  announcer?.img
                    ? announcer.img
                    : "https://res.cloudinary.com/ddcjbeysn/image/upload/v1699437344/person-gray-photo-placeholder-woman-t-shirt-white-background-131683043_rmfhru.jpg"
                }
                alt=""
              />
              <h1 className="text-center">{announcer.name}</h1>
            </Link>
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
