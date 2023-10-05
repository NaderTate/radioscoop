import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import Image from "next/image";
function Day({ Day, Images }: { Day: string; Images: Array<string> }) {
  return (
    <div className="">
      <div className="flex justify-center">
        <button className="text-white text-center border border-gray-300/30 rounded-md cursor-default border-b-0 px-5 rounded-b-none ">
          {Day}
        </button>
      </div>
      <div className="border border-md border-gray-300/30 rounded-md p-2 ">
        <Swiper
          dir="ltr"
          navigation
          freeMode={true}
          modules={[Navigation, FreeMode]}
          className=""
          slidesPerView={1.5}
          spaceBetween={10}
          breakpoints={{
            500: {
              slidesPerView: 2.6,
            },
            700: {
              slidesPerView: 3.6,
            },
            900: {
              slidesPerView: 4.6,
            },
            1400: {
              slidesPerView: 5.6,
            },
          }}
        >
          {Images.length > 0 &&
            Images.map((Img) => {
              return (
                <SwiperSlide className="w-full" key={Img}>
                  <Image
                    width={200}
                    height={200}
                    className="w-full rounded-md hover:scale-[1.01]"
                    src={Img}
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}
export default Day;
