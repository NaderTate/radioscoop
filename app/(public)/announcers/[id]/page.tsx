import prisma from "@/lib/prisma";
import ImagesSection from "../ImagesSection";
import Tabs from "../Tabs";
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
          "https://res.cloudinary.com/ddcjbeysn/image/upload/v1699437344/person-gray-photo-placeholder-woman-t-shirt-white-background-131683043_rmfhru.jpg"
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
