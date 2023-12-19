import Link from "next/link";
import Image from "next/image";
import { Image as NUIImage } from "@nextui-org/image";

type Props = {
  posts: {
    id: string | null;
    title: string | null;
    image: string | null;
    type: { name: string } | null;
    PostMonth: { year: { year: string }; name: string } | null;
  }[];
};

const ArticlesSection = ({ posts }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {posts.map((post) => {
        return (
          <Link
            key={post.id}
            href={{ pathname: `/articles/${post.id}` }}
            className="relative  w-52"
          >
            <NUIImage
              as={Image}
              width={210}
              height={210}
              className="object-cover   aspect-[9/16] rounded-md rounded-b-none"
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
  );
};

export default ArticlesSection;
