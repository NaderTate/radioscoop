import Link from "next/link";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
function Pagination({
  pages,
  query,
  Arr,
  link,
}: {
  pages: number[];
  query?: object;
  Arr: number[];
  link: string;
}) {
  const style =
    "inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full hover:bg-slate-400/50 transition bg-white dark:bg-inherit";
  return (
    <div>
      {pages && Arr && (
        <ol className="flex justify-center gap-1 mt-16 text-sm font-medium">
          <li>
            <Link
              href={{
                pathname: link,
                query: { page: pages.at(0), ...query },
              }}
              className={style}
            >
              <BsChevronDoubleLeft />
            </Link>
          </li>
          {Arr &&
            Arr.map((page: any) => (
              <li key={page}>
                <Link
                  href={{
                    pathname: link,
                    query: { page: page, ...query },
                  }}
                  className={style}
                >
                  {page}
                </Link>
              </li>
            ))}
          <li>
            <Link
              href={{
                pathname: link,
                query: { page: pages.at(-1), ...query },
              }}
              className={style}
            >
              <BsChevronDoubleRight />
            </Link>
          </li>
        </ol>
      )}
    </div>
  );
}

export default Pagination;
