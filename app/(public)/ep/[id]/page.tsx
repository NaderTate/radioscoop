import AudioCard from "@/components/AudioCard";
import EpisodeCard from "@/components/EpisodeCard";
import Link from "next/link";
import SidePanel from "@/components/SidePanel";
import prisma from "@/lib/prisma";
import ShareIcons from "@/components/ShareIcons";
import { AiOutlineHome } from "react-icons/ai";
export const revalidate = 60;

export async function generateStaticParams() {
  const products = await prisma.episode.findMany();
  return products.map((episode) => ({ id: episode.id }));
}
export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const episode = await prisma.episode.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        img: true,
        featured: true,
        featureTitle: true,
        title: true,
        category: {
          select: {
            name: true,
            img: true,
            series: true,
          },
        },
      },
    });
    if (!episode)
      return { title: "لا توجد", description: "هذه الحلقة غير موجودة" };
    return {
      title: episode.featured
        ? episode.featureTitle
        : `الحلقة ${episode.title} من ${
            episode.category?.series ? "مسلسل" : "برنامج"
          } ${episode?.category?.name}`,
      description:
        "راديو سكوب : اول راديو في مصر بنقل المتميزين من متتدربيه للاذاعات الكبرى اف ام  في مصر يمكن التواصل من خلال واتساب فيسبوك تويتر او انستاجرام او من خلال رقم الهاتف الجوال FM الكبرى",
      alternates: {
        canonical: `ep/${episode?.id}`,
      },
      twitter: {
        card: "summary_large_image",
        site: "@radioscoop",
        title: episode?.title,
        description:
          "راديو سكوب : اول راديو في مصر بنقل المتميزين من متتدربيه للاذاعات الكبرى اف ام  في مصر يمكن التواصل من خلال واتساب فيسبوك تويتر او انستاجرام او من خلال رقم الهاتف الجوال FM الكبرى",
        images: [
          episode.featured || episode?.img
            ? episode.img
            : episode.category?.img || "/favicon.png",
        ],
      },
      openGraph: {
        title: episode.featured
          ? episode.featureTitle
          : `الحلقة ${episode.title} من ${
              episode.category?.series ? "مسلسل" : "برنامج"
            } ${episode?.category?.name}`,
        images: [
          {
            url:
              episode.featured || episode?.img
                ? episode.img
                : episode.category?.img || "/favicon.png",
            width: 800,
            height: 800,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "لا توجد",
      description: "هذه الحلقة غير موجودة",
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
          img: true,
          authorId: true,
        },
      },
      presenter: { select: { name: true } },
      preparedBy: { select: { name: true } },
    },
  });

  const related = await prisma.episode.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              categoryId: Episode?.categoryId,
            },
            {
              category: {
                authorId: Episode?.category?.authorId,
              },
            },
          ],
        },
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
          img: true,
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
                <AiOutlineHome />
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
                {Episode?.featured
                  ? Episode.featureTitle
                  : `الحلقة ${Episode?.title} من ${Episode?.category?.name}`}
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
          <div className="mx-auto md:mx-7 flex-1 max-w-screen-2xl ">
            <div dir="ltr">{Episode && <AudioCard audio={Episode} />}</div>
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
