import prisma from "@/lib/prisma";
import ImagesSection from "../ImagesSection";
import Tabs from "../Tabs";
export const revalidate = 60;

export async function generateStaticParams() {
  const announcers = await prisma.author.findMany();
  return announcers.map((announcer) => ({ id: announcer.id }));
}
export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
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
            url:
              announcer?.img ||
              "https://res.cloudinary.com/ddcjbeysn/image/upload/v1699813302/person-placeholder-image_hrwla9.png",
            width: 800,
            height: 600,
          },
        ],
      },
      openGraph: {
        title: announcer?.name,
        images: [
          {
            url:
              announcer?.img ||
              "https://res.cloudinary.com/ddcjbeysn/image/upload/v1699813302/person-placeholder-image_hrwla9.png",
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
async function Announcer({ params: { id } }: { params: { id: string } }) {
  const announcer = await prisma.author.findUnique({
    where: {
      id,
    },
    include: {
      Categories: {
        select: {
          id: true,
          name: true,
          img: true,
          month: {
            select: {
              name: true,
              year: {
                select: {
                  year: true,
                },
              },
            },
          },
        },
      },
      posts: {
        select: {
          id: true,
          image: true,
          title: true,
          type: {
            select: {
              name: true,
            },
          },
          PostMonth: {
            select: {
              name: true,
              year: {
                select: {
                  year: true,
                },
              },
            },
          },
        },
      },
      PreparedFeatures: {
        select: {
          id: true,
          img: true,
          featureTitle: true,
          presenter: {
            select: {
              name: true,
            },
          },
        },
      },
      PresentedFeatures: {
        select: {
          id: true,
          img: true,
          featureTitle: true,
          preparedBy: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return (
    <div className="pb-10">
      <ImagesSection
        image={
          announcer?.img ||
          "https://res.cloudinary.com/ddcjbeysn/image/upload/v1699813302/person-placeholder-image_hrwla9.png"
        }
      />
      <h1 className="text-center text-xl mt-5 font-semibold">
        {announcer?.name}
      </h1>
      {announcer && <Tabs announcerData={announcer} />}
    </div>
  );
}

export default Announcer;
