import prisma from "@/lib/prisma";
async function page() {
  const articles = await prisma.post.findMany({
    take: 20,
    orderBy: {
      id: "desc",
    },
    include: { author: { select: { name: true } } },
  });
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 mt-10">
        {articles.map((article) => (
          <div className="flex flex-col" key={article.id}>
            <a href={`/poem/${article.id}`}>
              <img
                src={article.image}
                alt=""
                className="object-cover h-64 w-48 m-auto rounded-md"
              />
            </a>
            <p className="text-center">{article.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
