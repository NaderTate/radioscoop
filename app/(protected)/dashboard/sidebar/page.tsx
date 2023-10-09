import prisma from "@/lib/prisma";
import Posts from "./Posts";
async function page() {
  const posts = await prisma.post.findMany({
    take: 10,
  });
  return (
    <div>
      <Posts
        data={posts}
        search={async (e: string) => {
          "use server";
          return await prisma.post.findMany({
            where: {
              title: {
                contains: e,
              },
            },
          });
        }}
      />
    </div>
  );
}

export default page;
