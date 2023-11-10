import { Episode } from "@prisma/client";
interface Episodee extends Episode {
  category?: {
    name: string;
    img: string;
    author: { name: string } | null;
  } | null;
}
function EpisodeCard({ ep }: { ep: Episodee }) {
  return (
    <div className="hover:scale-[1.01] transition w-full aspect-square relative">
      <a
        href={`/ep/${ep.id}`}
        style={{ backgroundImage: `url(${ep.category?.img})` }}
        className=" block overflow-hidden h-full bg-center bg-no-repeat bg-cover rounded-xl"
      >
        {!ep.featured && (
          <span className="absolute z-10 inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-black/50 rounded-full right-4 top-4">
            الحلقة {ep.title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1.5 text-yellow-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
        )}
        <div className=" h-full text-white bg-black bg-opacity-40  ">
          <h5 className="absolute bottom-8 right-4 text-sm  sm:text-xl font-bold text-ellipsis whitespace-nowrap overflow-hidden">
            {ep?.category?.name}
          </h5>

          <h5 className="absolute bottom-4 right-4 text-sm font-bold text-ellipsis whitespace-nowrap overflow-hidden">
            {ep?.category?.author?.name}
          </h5>
        </div>
      </a>
    </div>
  );
}

export default EpisodeCard;
