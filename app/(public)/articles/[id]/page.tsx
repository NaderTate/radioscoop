import prisma from "@/lib/prisma";

import { Image } from "@nextui-org/react";

import Schedule from "@/components/public/Schedule";
import SidePanel from "@/components/public/SidePanel";
import Breadcrumbs from "@/components/public/Breadcrumbs";

export const revalidate = 60;

// export async function generateStaticParams() {
//   const posts = await prisma.post.findMany();
//   return posts.map((post) => ({ id: post.id }));
// }

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params: { id } }: Props) {
  try {
    const article = await prisma.post.findUnique({
      where: { id },
      select: {
        title: true,
        image: true,
        presenter: { select: { name: true } },
      },
    });

    return {
      title: article?.presenter
        ? `${article.title + " بقلم " + article.presenter.name}`
        : article?.title || "راديو سكووب",
      description: "راديو سكووب",
      twitter: {
        card: "summary_large_image",
        site: "@radio-scoop",
        title: article?.presenter
          ? `${article.title + " بقلم " + article.presenter.name}`
          : article?.title || "راديو سكووب",
        description: "راديو سكووب",
        images: [
          {
            url: article?.image,
            width: 800,
            height: 600,
          },
        ],
      },
      openGraph: {
        title: article?.presenter
          ? `${article.title + " بقلم " + article.presenter.name}`
          : article?.title || "راديو سكووب",
        images: [
          {
            url: article?.image,
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "لا توجد",
      description: "هذه الصفحة غير موجودة",
    };
  }
}
async function page({ params: { id } }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  return (
    <>
      <Breadcrumbs
        title={post?.title || ""}
        date={post?.createdAt || new Date()}
      />
      <section className="grid grid-cols-1 lg:grid-cols-5">
        <div className="p-2 hidden lg:block">
          <SidePanel />
        </div>
        <div className="lg:col-span-4 mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <h2 className="text-2xl text-center font-bold sm:text-3xl mb-6">
              {post?.title}
            </h2>

            <div className=" lg:py-6">
              <div className="flex justify-center">
                <div className="relative max-w-[600px] rounded-lg overflow-hidden ">
                  <Image
                    width={600}
                    height={400}
                    alt="House"
                    src={post?.image}
                    className=" h-full object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="relative flex items-center bg-gray-100/20 rounded-xl">
              <div className="p-8 sm:p-16 lg:p-24">
                {post?.content && (
                  <p className="mt-4 text-gray-600 text-sm dark:text-gray-200 md:text-lg font-semibold flex flex-col gap-1 md:gap-2 whitespace-pre-wrap">
                    {post.content}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 lg:hidden">
          <SidePanel />
          <div className="hidden">
            <Schedule title="" Days={[]} />
          </div>
        </div>
      </section>
    </>
  );
}

export default page;
