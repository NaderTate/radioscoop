"use client";

import Link from "next/link";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Schedule from "../Schedule";

import "swiper/css";
import "swiper/css/navigation";

import { Post } from "@/app/types";
type Props = {
  data: Post[] | any;
};
const MainSidePanel = ({ data }: Props) => {
  return (
    <div className="lg:max-w-xs mb-4  lg:mr-2">
      <div className="hidden lg:flex flex-col gap-3 ">
        <div
            className="rounded-lg sm:h-auto flex flex-col justify-between shadow-xl bg-slate-700 hover:scale-[1.01] cursor-pointer w-full"
          >
            <Link href={{ pathname: `/programs/65edfaa78f6ab857b61515f4` }}>
              <div className="w-full rounded-lg p-3 shadow-sm ">
                <img
                  src="https://res.cloudinary.com/dyzykrlnd/image/upload/v1710098353/IMG_8624_pyli1g.webp"
                  className=" object-contain w-full rounded-lg "
                />
              </div>
            </Link>
         
          </div>
        {data?.map((item: Post, index: number) => (
          <div
            key={index + item.title}
            className="rounded-lg sm:h-auto flex flex-col justify-between shadow-xl bg-slate-700 hover:scale-[1.01] cursor-pointer w-full"
          >
            <Link href={{ pathname: `/articles/${item.id}` }}>
              <div className="w-full rounded-lg p-3 shadow-sm ">
                <img
                  alt={item.title}
                  src={item.image}
                  className=" object-contain w-full rounded-lg "
                />
              </div>
            </Link>
            <h4 className="flex flex-col justify-between p-1 text-center rounded-lg mt-4 text-sm text-gray-100">
              {item.title}
            </h4>
          </div>
        ))}
      </div>
      <div className="lg:hidden">
        <Swiper
          dir="ltr"
          modules={[Navigation]}
          navigation
          spaceBetween={5}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
          }}
        ><SwiperSlide key={index + item.title}>
              <Link href={{ pathname: `/programs/65edfaa78f6ab857b61515f4` }}>
                <div
                  style={{
                    backgroundImage: `url(https://res.cloudinary.com/dyzykrlnd/image/upload/v1710098353/IMG_8624_pyli1g.webp})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    margin: "auto",
                  }}
                  className="rounded-lg h-80 sm:m-2 w-72 justify-end flex flex-col p-2 shadow-xl hover:scale-[1.01] cursor-pointer"
                >
                </div>
              </Link>
            </SwiperSlide>
          {data.map((item: Post, index: number) => (
            <SwiperSlide key={index + item.title}>
              <Link href={{ pathname: `/articles/${item.id}` }}>
                <div
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    margin: "auto",
                  }}
                  className="rounded-lg h-80 sm:m-2 w-72 justify-end flex flex-col p-2 shadow-xl hover:scale-[1.01] cursor-pointer"
                >
                  {item.title.length > 1 && (
                    <blockquote className="p-1 text-center rounded-lg bg-slate-700/50 backdrop-blur-sm ">
                      <p className="text-sm text-gray-100">{item.title}</p>
                    </blockquote>
                  )}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hidden">
        <Schedule title="" Days={[]} />
      </div>
    </div>
  );
};

export default MainSidePanel;
