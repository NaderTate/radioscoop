import AudioCard from "@/components/AudioCard";
import EpisodeCard from "@/components/EpisodeCard";
import Link from "next/link";
import SidePanel from "@/components/SidePanel";
import prisma from "@/lib/prisma";
import ShareIcons from "@/components/ShareIcons";
export async function generateStaticParams() {
  const products = await prisma.episode.findMany();
  return products.map((episode) => ({ id: episode.id }));
}
export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const episode = await prisma.episode.findUnique({
      where: { id: params.id },
      include: {
        category: { select: { name: true } },
      },
    });
    if (!episode)
      return { title: "Not found", description: "This episode does not exist" };
    return {
      title: ` الحلقة ${episode?.title} من ${episode?.category?.name}`,
      description:
        " 2022-10-1 راديو سكوب : اول راديو في مصر بنقل المتميزين من متتدربيه للاذاعات الكبرى اف ام  في مصر يمكن التواصل من خلال واتساب فيسبوك تويتر او انستاجرام او من خلال رقم الهاتف الجوال FM الكبرى",
      alternates: {
        canonical: `ep/${episode?.id}`,
      },
      twitter: {
        card: "summary_large_image",
        site: "@radioscoop",
        title: ` الحلقة ${episode?.title} من ${episode?.category?.name}`,
        description:
          " 2022-10-1 راديو سكوب : اول راديو في مصر بنقل المتميزين من متتدربيه للاذاعات الكبرى اف ام  في مصر يمكن التواصل من خلال واتساب فيسبوك تويتر او انستاجرام او من خلال رقم الهاتف الجوال FM الكبرى",
        images: [episode?.img || "/public/favicon.png"],
      },
      openGraph: {
        title: ` الحلقة ${episode?.title} من ${episode?.category?.name}`,
        images: [
          {
            url: episode?.img || "/public/favicon.png",
            width: 800,
            height: 800,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Not found",
      description: "This episode does not exist",
    };
  }
}
async function page({ params: { id } }: { params: { id: string } }) {
  const Episode = await prisma.episode.findUnique({
    where: {
      id,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      presenter: { select: { name: true } },
    },
  });

  const related = await prisma.episode.findMany({
    where: {
      AND: [
        { categoryId: Episode?.categoryId },
        {
          id: {
            not: Episode?.id,
          },
        },
      ],
    },
    take: 12,
    orderBy: { createdAt: "desc" },
    include: {
      category: {
        select: {
          name: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      },
      presenter: { select: { name: true } },
    },
  });
  const posts = await prisma.sideBar.findFirst({
    select: {
      Items: true,
    },
  });
  return (
    <div>
      <div>
        <nav aria-label="Breadcrumb" className="flex m-2 md:m-9">
          <ol
            role="list"
            className="flex overflow-hidden text-gray-700 border border-gray-200 rounded-lg dark:text-gray-200 dark:border-gray-700"
          >
            <li className="flex items-center">
              <Link
                href="/"
                className="flex items-center h-10 px-4 transition-colors bg-gray-100 dark:bg-gray-900 dark:hover:text-white hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="ml-1.5 font-medium text-xs hidden sm:inline">
                  الصفحة الرئيسية
                </span>
              </Link>
            </li>
            <li className="relative flex items-center">
              <span className="absolute inset-y-0 w-4 h-10 bg-gray-100 dark:bg-gray-900 -left-px [clip-path:_polygon(0_0,_0%_100%,_100%_50%)]"></span>
              <button
                type="button"
                className="flex items-center h-10 pl-8 pr-4 text-xs font-medium transition-colors bg-white dark:bg-gray-800 dark:hover:text-white hover:text-gray-900"
              >
                الحلقة {Episode?.title} من {Episode?.category?.name}
              </button>
            </li>
            <li className="relative flex items-center">
              <span className="absolute inset-y-0 w-4 h-10 bg-gray-100 dark:bg-gray-900 -left-px [clip-path:_polygon(0_0,_0%_100%,_100%_50%)]"></span>
              <button
                type="button"
                className="flex items-center h-10 pl-8 pr-4 text-xs font-medium transition-colors bg-white dark:bg-gray-800 dark:hover:text-white hover:text-gray-900"
              >
                {new Date(Episode?.createdAt || Date.now()).toDateString()}
              </button>
            </li>
          </ol>
        </nav>
      </div>
      <section className="flex flex-col lg:flex-row-reverse justify-between">
        <div className="flex-1 flex justify-center">
          <div className="mx-auto md:mx-7 flex-1 max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="px-5" dir="ltr">
              {Episode && <AudioCard audio={Episode} />}
            </div>
            <div className="flex justify-center flex-col">
              <h5 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200">
                مشاركة الحلقة
              </h5>
              <div className="flex flex-wrap md:flex-nowrap justify-center">
                <ShareIcons
                  mainImg={Episode?.img || "/favicon.png"}
                  title={` الحلقة ${Episode?.title} من ${Episode?.category?.name}`}
                />
              </div>
            </div>
            {!Episode?.featured && (
              <div className="p-5">
                <div>
                  <h1 className="text-2xl font-bold text-center my-10">
                    حلقات ذات صلة
                  </h1>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 items-center justify-center">
                  {related?.map((ep) => (
                    <EpisodeCard key={ep.id} ep={ep} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:pt-10">
          <SidePanel data={posts?.Items || []} />
        </div>
      </section>
    </div>
  );
}

export default page;
