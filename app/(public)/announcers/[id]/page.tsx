import prisma from "@/lib/prisma";

import AnnouncerTabs from "./_components/AnnouncerTabs";
import ImagesSection from "./_components/ImagesSection";

import { getAnnouncerData } from "../utils";

export const revalidate = 60;

export async function generateStaticParams() {
  const announcers = await prisma.author.findMany();
  return announcers.map((announcer) => ({ id: announcer.id }));
}

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params: { id } }: Props) {
  try {
    const announcer = await prisma.author.findUnique({
      where: { id },
      select: {
        name: true,
        img: true,
      },
    });
    return {
      title: announcer?.name,
      description: "راديو سكووب",
      twitter: {
        card: "summary_large_image",
        site: "@radio-scoop",
        title: announcer?.name,

        description: "راديو سكووب",
        images: [
          {
            url: announcer?.img || "https://b.l3n.co/i/SqybT1.png",
            width: 800,
            height: 600,
          },
        ],
      },
      openGraph: {
        title: announcer?.name,
        images: [
          {
            url: announcer?.img || "https://b.l3n.co/i/SqybT1.png",
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "لا توجد",
      description: "هذه الصفحة غير موجودة",
    };
  }
}
async function Announcer({ params: { id } }: Props) {
  const announcer = await getAnnouncerData(id);

  return (
    <div className="pb-10">
      <ImagesSection
        image={announcer?.img || "https://b.l3n.co/i/SqybT1.png"}
      />
      <h1 className="text-center text-xl mt-5 font-semibold">
        {announcer?.name}
      </h1>
      {announcer && <AnnouncerTabs announcerData={announcer} />}
    </div>
  );
}

export default Announcer;
