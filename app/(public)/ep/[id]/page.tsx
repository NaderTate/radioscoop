import prisma from "@/lib/prisma";

import ShareIcons from "./_components/ShareIcons";
import AudioCard from "@/components/public/AudioCard";
import SidePanel from "@/components/public/SidePanel";
import EpisodeCard from "@/components/public/EpisodeCard";
import Breadcrumbs from "@/components/public/Breadcrumbs";

import { getEpisodeData, getRelatedEpisodes } from "./utils";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await prisma.episode.findMany();
  return products.map((episode) => ({ id: episode.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const episode = await getEpisodeData(params.id);
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
            : episode.category?.img || "/logo.png",
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
                : episode.category?.img || "/logo.png",
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
  const Episode = await getEpisodeData(id);

  const related =
    Episode &&
    (await getRelatedEpisodes(
      id,
      Episode.category?.id,
      Episode.category?.authorId
    ));

  const srcMatch = Episode?.embedLink?.match(/<iframe.*?src=["'](.*?)["']/);
  const srcUrl = srcMatch && srcMatch[1];

  return (
    <div className="max-w-screen overflow-hidden">
      <div>
        <Breadcrumbs
          title={
            Episode?.featured
              ? Episode.featureTitle || ""
              : `الحلقة ${Episode?.title} من ${Episode?.category?.name}` || ""
          }
          date={Episode?.createdAt || new Date()}
        />
      </div>
      <section className="flex flex-col lg:flex-row-reverse justify-between">
        <div className="flex-1 flex justify-center">
          <div className="mx-auto md:mx-7 flex-1 max-w-screen-2xl ">
            {Episode?.featured && (
              <div
                dir="rtl"
                className="my-4 md:mr-10 text-center font-semibold flex flex-col gap-1"
              >
                <div>{Episode.featureTitle}</div>
                <div>{Episode.category?.name}</div>
                <div>اعداد {Episode?.preparedBy?.name}</div>
                <div>تقديم {Episode?.presenter?.name}</div>
              </div>
            )}
            <div dir="ltr">
              {Episode && Episode.embedLink ? (
                <iframe
                  width="100%"
                  className="aspect-video rounded-md mb-5"
                  src={srcUrl ?? ""}
                  title={Episode?.category?.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                Episode && <AudioCard audio={Episode} />
              )}
            </div>
            <div className="flex justify-center flex-col">
              <h5 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200">
                مشاركة الحلقة
              </h5>
              <div className="flex flex-wrap md:flex-nowrap justify-center">
                <ShareIcons
                  mainImg={Episode?.img || "/logo.png"}
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
        <SidePanel />
      </section>
    </div>
  );
}

export default page;
