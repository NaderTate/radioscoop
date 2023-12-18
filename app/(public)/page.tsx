import prisma from "@/lib/prisma";

import Link from "next/link";

import Contact from "@/components/public/Contact";
import Schedule from "@/components/Schedule";
import SidePanel from "@/components/SidePanel";
import LiveRadioPlayer from "@/components/public/LiveRadioPlayer";
import EpisodesSection from "@/components/public/EpisodesSection";

export const revalidate = 60;

export const metadata = {
  title: "راديو سكووب | اذاعة بطعم السعادة",
  description: "راديو سكووب | اذاعة بطعم السعادة",
};

async function Home() {
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
  const series = await prisma.episode.findMany({
    where: {
      categoryId: "655080f6b67e7e9d49578ab8",
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
    <main>
      <div className="p-5 m-2 dark:border-white border rounded-xl border-gray-500">
        <LiveRadioPlayer />
        <Contact />
      </div>
      <Link href="/articles/655083ccb67e7e9d49578abb">
        <img
          src="https://res.cloudinary.com/ddcjbeysn/image/upload/v1700413414/programs/402228471_313029954876007_2413582928079890119_n_h0whdt.jpg"
          alt=""
          className="lg:hidden w-3/4 m-auto rounded-md my-10"
        />
        <h1 className="font-semibold text-center my-5 text-lg -mt-5 lg:hidden">
          مع راديو سكووب حلمك بقى حقيقة
        </h1>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="p-2 hidden lg:block">
          <SidePanel data={posts?.Items || []} />
        </div>

        <div className="lg:col-span-4 lg:border-r border-gray-800 dark:border-gray-300 ">
          <EpisodesSection
            title=" مسلسل أغرب القضايا"
            data={series}
            seeAll="/programs/655080f6b67e7e9d49578ab8"
          />
          <EpisodesSection title="أحدث الحلقات" data={Episodes} seeAll="/ep" />
          <Schedule Days={schedule?.Days} title={schedule?.title as string} />
        </div>
        <div className="p-2 lg:hidden">
          <SidePanel data={posts?.Items || []} />
        </div>
      </div>
    </main>
  );
}

export default Home;
