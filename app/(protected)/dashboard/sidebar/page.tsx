import prisma from "@/lib/prisma";
import Posts from "./Posts";
async function page() {
  const posts = await prisma.sideBar.findFirst({
    select: {
      Items: true,
    },
  });
  return (
    <div>
      <Posts
        data={posts?.Items || []}
        search={async (e: string) => {
          "use server";
          return await prisma.post.findMany({
            where: {
              OR: [
                {
                  title: {
                    contains: e,
                  },
                },
                {
                  content: {
                    contains: e,
                    mode: "insensitive",
                  },
                },
              ],
            },
            select: {
              id: true,
              image: true,
              title: true,
            },
          });
        }}
      />
    </div>
  );
}

export default page;
