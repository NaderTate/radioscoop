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
    include: { author: { select: { name: true } }, category: true },
  });

  return (
    <div>
      <Contact />
      <div className="grid grid-cols-4 justify-between min-h-screen  lg:border-r">
        <div>
          <SidePanel />
        </div>
        <div className="col-span-3 flex flex-col flex-grow lg:border-r border-gray-800 dark:border-gray-300 ">
          <div className="">
            <EpisodesSection
              title="أحدث الحلقات"
              data={Episodes}
              seeAll="/ep"
            />
            <Schedule />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
