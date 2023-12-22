import prisma from "@/lib/prisma";

import Schedule from "./_components/Schedule";

export const revalidate = 100;

async function page() {
  const schedule = await prisma.schedule.findFirst({
    select: {
      Days: true,
      title: true,
    },
  });

  return <Schedule Days={schedule?.Days} title={schedule?.title || ""} />;
}

export default page;
