import Schedule from "./Schedule";
import prisma from "@/lib/prisma";
async function page() {
  const days = await prisma.schedule.findFirst({
    select: {
      Days: true,
    },
  });
  console.log(days);
  return (
    <div>
      <Schedule Days={days?.Days} />
    </div>
  );
}

export default page;
