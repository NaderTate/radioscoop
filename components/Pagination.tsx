"use client";

import { Route } from "next";
import { useRouter, usePathname } from "next/navigation";
import { Pagination as NUIPagination } from "@nextui-org/pagination";

type Props = {
  currentPage: number;
  total: number;
  queries?: Record<string, string | number>;
};

function Pagination({ total, queries, currentPage }: Props) {
  const router = useRouter();
  const pathname = usePathname() as Route;

  // This function coverts the object for a query format for exmple:
  // {search:"hello",page:1} to search=hello&page=1
  function objectToQueryString(obj: Record<string, string | number>): string {
    return Object.entries(obj)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`
      )
      .join("&");
  }

  const formateedQueries = queries ? objectToQueryString(queries) : "";

  return (
    <div className="flex justify-center my-5">
      <NUIPagination
        initialPage={currentPage || 1}
        dir="ltr"
        total={total}
        onChange={(e) => {
          router.push(`${pathname}?page=${e}&${formateedQueries}`);
        }}
      />
    </div>
  );
}

export default Pagination;
