import Contact from "@/components/Contact";
import EpisodesSection from "@/components/EpisodesSection";
import Schedule from "@/components/Schedule";
import SidePanel from "@/components/SidePanel";
import prisma from "@/lib/prisma";
async function page() {
  const Episodes = await prisma.episode.findMany({
    where: {
      featured: false,
    },
    take: 20,
    orderBy: {
      id: "desc",
    },
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
    <div>
      <Contact />
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="p-2 hidden lg:block">
          <SidePanel data={posts?.Items || []} />
        </div>

        <div className="lg:col-span-4 lg:border-r border-gray-800 dark:border-gray-300 ">
          <EpisodesSection title="أحدث الحلقات" data={Episodes} seeAll="/ep" />
          <Schedule Days={schedule?.Days} title={schedule?.title || ""} />
        </div>
        <div className="p-2 lg:hidden">
          <SidePanel data={posts?.Items || []} />
        </div>
      </div>
    </div>
  );
}

export default page;
