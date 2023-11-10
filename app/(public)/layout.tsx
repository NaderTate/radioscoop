import Header from "@/components/Header";
import prisma from "@/lib/prisma";
import Footer from "@/components/Footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const featureTypes = await prisma.featureType.findMany({
    select: {
      name: true,
      id: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  const seasons = await prisma.year.findMany({
    select: {
      year: true,
      months: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  const articleTypes = await prisma.type.findMany({
    select: {
      name: true,
      id: true,
      posts: {
        select: {
          PostMonth: {
            select: {
              name: true,
              id: true,
              year: {
                select: {
                  year: true,
                },
              },
            },
          },
        },
      },
    },
  });
  // format the array so that I get the following:
  // name, id, the years and the months of each year
  const FormattedArticleTypes = articleTypes.map((item) => {
    const postsMap: { [key: number]: { id: string; name: string }[] } = {};

    item.posts.forEach((post: any) => {
      const year = post.PostMonth.year.year;
      const month = post.PostMonth;

      if (!postsMap[year]) {
        postsMap[year] = [{ name: month.name, id: month.id }];
      } else if (postsMap[year].find((item) => item.id === month.id)) {
        return;
      } else {
        postsMap[year].push({ name: month.name, id: month.id });
      }
    });

    const formattedPosts = Object.keys(postsMap).map((year: any) => {
      return {
        year: parseInt(year),
        months: postsMap[year],
      };
    });

    return {
      name: item.name,
      id: item.id,
      seasons: formattedPosts,
    };
  });

  return (
    <div>
      <Header
        featureTypes={featureTypes}
        seasons={seasons}
        articleTypes={FormattedArticleTypes}
      />
      {children}
      <Footer />
    </div>
  );
}
