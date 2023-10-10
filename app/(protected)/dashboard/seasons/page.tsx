import prisma from "@/lib/prisma";
import Seasons from "./Seasons";
async function page() {
  const years = await prisma.year.findMany();
  return (
    <div>
      <Seasons years={years} />
    </div>
  );
}

export default page;
