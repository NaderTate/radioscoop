"use client";
import { Image } from "@nextui-org/image";
import { Tabs as NextUITabs, Tab } from "@nextui-org/tabs";
import Link from "next/link";
function Tabs({
  announcerData,
}: {
  announcerData: {
    name: string;
    id: string;
    posts: {
      id: string | null;
      title: string | null;
      image: string | null;
      type: { name: string } | null;
      PostMonth: { year: { year: string }; name: string } | null;
    }[];
    PresentedFeatures: {
      featureTitle: string | null;
      img: string | null;
      id: string | null;
      preparedBy: { name: string | null } | null;
    }[];
    PreparedFeatures: {
      featureTitle: string | null;
      img: string | null;
      id: string | null;
      presenter: { name: string | null } | null;
    }[];
    Categories: {
      id: string;
      img: string;
      name: string;
      month: { name: string; year: { year: string } } | null;
    }[];
  };
}) {
  return (
    <div className="my-5">
      <div className="flex flex-col justify-center items-center">
        <NextUITabs variant="bordered">
          {announcerData.Categories.length > 0 && (
            <Tab title="البرامج">
              <div className="flex flex-wrap justify-center gap-5">
                {announcerData.Categories.map((category) => {
                  return (
                    <Link
                      key={category.id}
                      href={{ pathname: `/programs/${category.id}` }}
                    >
                      <Image
                        width={200}
                        height={200}
                        className="object-cover aspect-square rounded-t-md rounded-b-none"
                        src={category.img}
                        alt=""
                      />
                      <div className="bg-gray-900 p-4 rounded-b-md">
                        <p className="text-xs text-gray-500">
                          {category?.month?.year.year} / {category?.month?.name}
                        </p>

                        <h5 className="text-sm text-white">{category.name}</h5>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Tab>
          )}
          {announcerData.posts.length > 0 && (
            <Tab title="المقالات">
              <div className="flex flex-wrap justify-center gap-5">
                {announcerData.posts.map((post) => {
                  return (
                    <Link
                      key={post.id}
                      href={{ pathname: `/articles/${post.id}` }}
                      className="relative"
                    >
                      <Image
                        width={135}
                        height={135}
                        className="object-contain rounded-md rounded-b-none"
                        src={post?.image!}
                        alt=""
                      />
                      <div className="absolute top-0 right-0 bg-gray-500 rounded-md z-10 text-sm rounded-tl-none rounded-br-none p-1">
                        {post.type?.name}
                      </div>
                      <div className="bg-gray-900 p-4 rounded-b-md">
                        <p className="text-xs text-gray-500">
                          {post?.PostMonth?.year.year} / {post?.PostMonth?.name}
                        </p>

                        <h5 className="text-sm text-white">{post.title}</h5>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Tab>
          )}
          {(announcerData.PreparedFeatures.length > 0 ||
            announcerData.PresentedFeatures.length > 0) && (
            <Tab title="الفيتشرات">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                {announcerData.PreparedFeatures.map((feature) => {
                  return (
                    <div
                      key={feature.id}
                      className="flex flex-col relative h-fit"
                    >
                      <Link href={{ pathname: `/ep/${feature.id}` }}>
                        <img
                          className="shadow-md shadow-indigo-300/50 rounded-md  brightness-[.6] "
                          src={feature.img || ""}
                          alt=""
                        />
                        <div className="absolute bottom-24 right-1 font-semibold tracking-wide">
                          اعداد {announcerData.name}
                        </div>
                        <div className="absolute bottom-16 right-1 font-semibold tracking-wide">
                          تقديم {feature.presenter?.name}
                        </div>
                        <div className="bg-gray-900 p-4 rounded-b-md">
                          <p className="text-center">{feature.featureTitle}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
                {announcerData.PresentedFeatures.map((feature) => {
                  return (
                    <div
                      key={feature.id}
                      className="flex flex-col relative h-fit"
                    >
                      <Link href={{ pathname: `/ep/${feature.id}` }}>
                        <img
                          className="shadow-md shadow-indigo-300/50 rounded-md  brightness-[.6]"
                          src={feature.img || ""}
                          alt=""
                        />
                        <div className="absolute bottom-24 right-1 font-semibold tracking-wide">
                          اعداد {announcerData.name}
                        </div>
                        <div className="absolute bottom-16 right-1 font-semibold tracking-wide">
                          تقديم {announcerData.name}
                        </div>
                        <div className="bg-gray-900 p-4 rounded-b-md">
                          <p className="text-center">{feature.featureTitle}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </Tab>
          )}
        </NextUITabs>
      </div>
    </div>
  );
}

export default Tabs;
