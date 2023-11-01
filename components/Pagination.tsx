import Link from "next/link";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
function Pagination({
  pages,
  query,
  Arr,
  link,
  currentPage,
}: {
  pages: number[];
  query?: object;
  Arr: number[];
  link: string;
  currentPage?: number;
}) {
  return (
    <div dir="ltr">
      {pages && Arr && (
        <ol className="flex justify-center gap-1 my-16 text-sm font-medium items-center">
          <li>
            <Link
              href={{
                pathname: link,
                query: { page: pages.at(0), ...query },
              }}
              className={""}
            >
              <BsChevronDoubleLeft />
            </Link>
          </li>
          {Arr &&
            Arr.map((page: number) => (
              <li key={page}>
                <Link
                  href={{
                    pathname: link,
                    query: { page: page, ...query },
                  }}
                  className={` inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full hover:bg-slate-400/50 transition bg-white dark:bg-inherit dark:hover:bg-slate-600/50 dark:border-gray-700 dark:text-gray-100 ${
                    currentPage === page
                      ? "bg-slate-400/50 dark:bg-slate-600/50"
                      : ""
                  }`}
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
              className={""}
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
