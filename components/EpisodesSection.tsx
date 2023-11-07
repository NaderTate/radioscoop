"use client";
import Link from "next/link";
import EpisodeCard from "./EpisodeCard";
import { Navigation, Pagination, Scrollbar, A11y, Grid } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Episode } from "@prisma/client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/grid";
interface data extends Episode {
  category?: { name: string; author: { name: string } | null } | null;
}

function EpisodesSection({
  title,
  data,
  seeAll,
}: {
  title: string;
  data: Array<data>;
  seeAll: string;
}) {
  return (
    <section className="p-1 sm:p-3 w-full m-auto mb-10">
      <div className="px-4 py-5 mx-auto sm:px-6 lg:px-8 rounded-lg border border-gray-300/30 bg-slate-100/5">
        <div className=" justify-between flex bg-slate-400/25 rounded-3xl items-center p-2 mb-5">
          <div className=" ">
            <h2 className="text-base font-bold tracking-tight sm:text-2xl md:text-2xl">
              {title}
            </h2>
          </div>
          {seeAll && (
            <Link
              className="inline-flex  items-center flex-shrink-0 px-2 py-2 font-medium text-gray-800 border transition border-gray-100 rounded-full  hover:text-white hover:bg-gray-500 dark:hover:bg-gray-100 dark:hover:text-gray-800 dark:text-white"
              href={{ pathname: seeAll }}
            >
              مشاهدة الكل
            </Link>
          )}
        </div>
        {
          <Swiper
            dir="ltr"
            grid={{ rows: 3, fill: "row" }}
            slidesPerView={2}
            spaceBetween={10}
            breakpoints={{
              850: {
                grid: {
                  rows: 2,
                  fill: "row",
                },
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1400: {
                grid: {
                  rows: 2,
                  fill: "row",
                },
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            modules={[Navigation, Pagination, Scrollbar, A11y, Grid]}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className=""
          >
            {data.map((item) => (
              <SwiperSlide
                key={item.id + title}
                className="flex justify-center"
              >
                <EpisodeCard ep={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        }
      </div>
    </section>
  );
}
export default EpisodesSection;
