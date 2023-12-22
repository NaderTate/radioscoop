import prisma from "@/lib/prisma";

export const getAnnouncerData = async (authorId: string) => {
  const announcerData = await prisma.author.findUnique({
    where: {
      id: authorId,
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
  return announcerData;
};
