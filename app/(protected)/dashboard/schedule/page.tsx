import Schedule from "./Schedule";
import prisma from "@/lib/prisma";
export const revalidate = 100;
async function page() {
  const schedule = await prisma.schedule.findFirst({
    select: {
      Days: true,
      title: true,
    },
  });
  return (
    <div>
      <Schedule Days={schedule?.Days} title={schedule?.title || ""} />
    </div>
  );
}

export default page;
