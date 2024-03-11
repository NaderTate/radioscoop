import prisma from "@/lib/prisma";

import Link from "next/link";

import Contact from "@/components/public/Contact";
import Schedule from "@/components/public/Schedule";
import SidePanel from "@/components/public/SidePanel";
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
            series: false,
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
      categoryId: "65edfaa78f6ab857b61515f4",
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

  return (
    <main>
      <div className="p-5 m-2 dark:border-white border rounded-xl border-gray-500">
        <LiveRadioPlayer />
        <Contact />
      </div>
      <div className="p-10 flex flex-col items-center lg:hidden">
        <iframe
          className="mx-auto rounded-md aspect-video"
          width="100%"
          height="350"
          src="https://www.youtube.com/embed/ZCZTM3BD02k?si=h-Fiso4MwQAex7Lh"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <h1 className="font-semibold ">
          اسمعونا يومياً على #راديو_مصر 88.7 فى مسلسل #بنات_ذوات الساعه ٤ قبل
          الفطار برعاية #راديو_سكووب بطولة الفنان #كريم_عفيفي والفنانة القديرة
          #انعام_سالوسة والفنان مجدي عبد الحليم اخراج عمرو عبده دياب والاشراف
          الاذاعي احمد اسماعيل
        </h1>
      </div>
      {/* <Link href="/articles/655083ccb67e7e9d49578abb">
        <img
          src="https://res.cloudinary.com/ddcjbeysn/image/upload/v1700413414/programs/402228471_313029954876007_2413582928079890119_n_h0whdt.jpg"
          alt=""
          className="lg:hidden w-3/4 m-auto rounded-md my-10"
        />
        <h1 className="font-semibold text-center my-5 text-lg -mt-5 lg:hidden">
          مع راديو سكووب حلمك بقى حقيقة
        </h1>
      </Link> */}
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="p-2 hidden lg:block">
          <SidePanel />
        </div>

        <div className="lg:col-span-4 lg:border-r border-gray-800 dark:border-gray-300 ">
          <EpisodesSection
            title=" مسلسل  بنات ذوات"
            data={series}
            seeAll="/programs/65edfaa78f6ab857b61515f4"
          />
          <EpisodesSection title="أحدث الحلقات" data={Episodes} seeAll="/ep" />
          <Schedule Days={schedule?.Days} title={schedule?.title as string} />
        </div>
        <div className="p-2 lg:hidden">
          <SidePanel />
        </div>
      </div>
    </main>
  );
}

export default Home;
