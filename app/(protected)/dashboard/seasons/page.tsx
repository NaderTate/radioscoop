import prisma from "@/lib/prisma";
import Seasons from "./Seasons";
async function page() {
  const years = await prisma.year.findMany({
    include: {
      months: {
        include: {
          categories: true,
        },
      },
    },
  });
  return (
    <div>
      <Seasons
        years={years}
        getPrograms={async (e: string) => {
          "use server";
          return await prisma.category.findMany({
            where: {
              name: {
                contains: e,
                mode: "insensitive",
              },
            },
          });
        }}
      />
    </div>
  );
}

export default page;
