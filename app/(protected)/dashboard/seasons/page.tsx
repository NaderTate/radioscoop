import prisma from "@/lib/prisma";

import Seasons from "./_components/Seasons";

async function page() {
  const years = await prisma.year.findMany({
    include: {
      months: {
        include: {
          categories: true,
        },
      },
    },
    orderBy: { year: "asc" },
  });

  return <Seasons years={years} />;
}

export default page;
