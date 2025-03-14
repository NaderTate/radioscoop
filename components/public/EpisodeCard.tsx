import { Episode } from "@prisma/client";
import Link from "next/link";
import { Image } from "@nextui-org/image";
import { category } from "@/app/types";

interface Episode_ extends Episode {
  category: category;
}

type Props = {
  ep: Episode_;
};

function EpisodeCard({ ep }: Props) {
  const isExternal = ep.embedLink?.includes("facebook");

  const content = (
    <>
      <Image
        src={ep.img ? ep.img : ep?.category?.img}
        className="aspect-square object-cover brightness-[.6]"
        alt={ep.title}
      />
      {!ep.featured && (
        <span className="absolute z-10 inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-black/50 rounded-full right-4 top-4">
          الحلقة {ep.title}
        </span>
      )}
      <div className="text-white bg-black bg-opacity-40">
        <h5 className="absolute bottom-8 right-4 text-sm sm:text-xl font-bold text-ellipsis whitespace-nowrap overflow-hidden z-10">
          {ep?.category?.name}
        </h5>
        <h5 className="absolute flex gap-x-1 bottom-4 right-4 text-sm font-bold text-ellipsis whitespace-nowrap overflow-hidden z-10">
          {ep?.category?.author.map((author) => (
            <h1 key={author.name}>{author.name}</h1>
          ))}
        </h5>
      </div>
    </>
  );

  return (
    <div className="relative aspect-square">
      {isExternal ? (
        <a
          href={ep.embedLink as string}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      ) : (
        <Link href={{ pathname: `/ep/${ep.id}` }}>{content}</Link>
      )}
    </div>
  );
}

export default EpisodeCard;
