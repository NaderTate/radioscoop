import prisma from "@/lib/prisma";

import Posts from "./_components/Posts";

async function page() {
  const posts = await prisma.sideBar.findFirst({
    select: {
      Items: true,
    },
  });
  return <Posts data={posts?.Items || []} />;
}

export default page;
