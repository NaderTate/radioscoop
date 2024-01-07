import { Image as NUIImage } from "@nextui-org/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

type Props = {
  Day: string;
  Images: { id: string; link: string }[];
};

function Day({ Day, Images }: Props) {
  return (
    <>
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
            Images.map((Img, i) => {
              return (
                <SwiperSlide className="w-full" key={i}>
                  <NUIImage
                    width={200}
                    height={200}
                    className="w-full rounded-md hover:scale-[1.01] transition-transform"
                    src={Img.link}
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </>
  );
}
export default Day;
