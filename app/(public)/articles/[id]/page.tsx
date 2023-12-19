import prisma from "@/lib/prisma";

import Link from "next/link";
import { Image } from "@nextui-org/image";

import SidePanel from "@/components/SidePanel";
import Schedule from "@/components/Schedule";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await prisma.post.findMany();
  return posts.map((post) => ({ id: post.id }));
}

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
      <div>
        <nav aria-label="Breadcrumb" className="flex m-2 md:m-9">
          <ol
            role="list"
            className="flex overflow-hidden text-gray-700 border border-gray-200 rounded-lg dark:text-gray-200 dark:border-gray-700"
          >
            <li className="flex items-center">
              <Link
                href="/"
                className="flex items-center h-10 px-4 transition-colors bg-gray-100 dark:bg-gray-900 dark:hover:text-white hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="ml-1.5 font-medium text-xs hidden sm:inline">
                  الصفحة الرئيسية
                </span>
              </Link>
            </li>
            <li className="relative flex items-center">
              <span className="absolute inset-y-0 w-4 h-10 bg-gray-100 dark:bg-gray-900 -left-px [clip-path:_polygon(0_0,_0%_100%,_100%_50%)]"></span>
              <button
                type="button"
                className="flex items-center h-10 pl-8 pr-4 text-xs font-medium transition-colors bg-white dark:bg-gray-800 dark:hover:text-white hover:text-gray-900"
              >
                {post?.title}
              </button>
            </li>
            <li className="relative flex items-center">
              <span className="absolute inset-y-0 w-4 h-10 bg-gray-100 dark:bg-gray-900 -left-px [clip-path:_polygon(0_0,_0%_100%,_100%_50%)]"></span>
              <button
                type="button"
                className="flex items-center h-10 pl-8 pr-4 text-xs font-medium transition-colors bg-white dark:bg-gray-800 dark:hover:text-white hover:text-gray-900"
              >
                {new Date(post?.createdAt || "").toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </button>
            </li>
          </ol>
        </nav>
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-5">
        <div className="p-2 hidden lg:block">
          <SidePanel />
        </div>
        <div className="lg:col-span-4 mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold sm:text-3xl mb-6">
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
