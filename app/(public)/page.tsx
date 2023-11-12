import Contact from "@/components/Contact";
import EpisodesSection from "@/components/EpisodesSection";
import Schedule from "@/components/Schedule";
import SidePanel from "@/components/SidePanel";
import prisma from "@/lib/prisma";
import Link from "next/link";
export const revalidate = 60;
export const metadata = {
  title: "راديو سكووب | اذاعة بطعم السعادة",
  description: "راديو سكووب | اذاعة بطعم السعادة",
};
async function page() {
  const Episodes = await prisma.episode.findMany({
    where: {
      AND: [
        {
          featured: false,
        },
        {
          category: {
            NOT: {
              series: true,
            },
          },
        },
      ],
    },
    take: 20,
    orderBy: {
      id: "desc",
    },
    include: {
      category: {
        select: {
          name: true,
          img: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  const schedule = await prisma.schedule.findFirst({
    select: {
      Days: true,
      title: true,
    },
  });
  const posts = await prisma.sideBar.findFirst({
    select: {
      Items: true,
    },
  });
  return (
    <div>
      <Contact />
      <Link href="/articles/655083ccb67e7e9d49578abb">
        <>
          <img
            src="https://telegra.ph/file/0c1a8d236e05ade092b4c.jpg"
            alt=""
            className="lg:hidden w-3/4 m-auto rounded-md my-10"
          />
          <h1 className="font-semibold text-center my-5 text-lg -mt-5 lg:hidden">
            مع راديو سكووب حلمك بقى حقيقة
          </h1>
        </>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="p-2 hidden lg:block">
          <SidePanel data={posts?.Items || []} />
        </div>

        <div className="lg:col-span-4 lg:border-r border-gray-800 dark:border-gray-300 ">
          <EpisodesSection title="أحدث الحلقات" data={Episodes} seeAll="/ep" />
          <Schedule Days={schedule?.Days} title={schedule?.title || ""} />
        </div>
        <div className="p-2 lg:hidden">
          <SidePanel data={posts?.Items || []} />
        </div>
      </div>
    </div>
  );
}

export default page;
