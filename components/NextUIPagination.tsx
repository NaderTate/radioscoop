"use client";
import { Pagination } from "@nextui-org/pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function NextUIPagination({
  total,
  queries = [],
}: {
  total: number;
  queries?: Array<string | undefined>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryStr = queries
    .map((query) => {
      return (
        query &&
        `${
          searchParams.get(query)
            ? "&" + query + "=" + searchParams.get(query)
            : ""
        }`
      );
    })
    .join("");
  const currentPage = Number(searchParams.get("page")) || 1;
  return (
    <div className="flex justify-center my-5">
      <Pagination
        initialPage={currentPage}
        dir="ltr"
        total={total}
        onChange={(e) => {
          // @ts-ignore
          router.push(`${pathname}?page=${e}${queryStr}`);
        }}
      />
    </div>
  );
}

export default NextUIPagination;
