"use client";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

const data = [
  // {
  //   title: 'ورشه التعليق الصوتي الاقوي والافضل',
  //   image: 'https://telegra.ph/file/189b36fbeb07d82d914a7.png',
  //   link: '/articles/6339d8b3eb8c933b9fd29f0f',
  // },
  {
    title: "",
    image: "https://telegra.ph/file/3f01943eea2a224efb9e9.jpg",
    link: "/articles/63b5aeeda011cc11f79ee6dd",
  },
  {
    title: "",
    image: "https://telegra.ph/file/5c80bed6b69f0944cff28.jpg",
    link: "/articles/63b92a0565dfb05bd288f892",
  },
  {
    title: "كيف تتحدث بصوت أكثر عمقًا",
    image: "https://telegra.ph/file/98629bad43c308f8ca705.png",
    link: "/articles/6391c99dc56db12bc59b0f5e",
  },
  {
    title: "الدبلجة وكلّ ما تودّ معرفته",
    image: "https://telegra.ph/file/d87d3cba6473c079f12f8.png",
    link: "/articles/637f4eb0aaba9f17576ac744",
  },
  {
    title: "عيناتك الصوتيه هي سيرتك الذاتية.. فكيف تعدها؟",
    image: "https://telegra.ph/file/31a789110fef83061ad8e.jpg",
    link: "/articles/6376486c6369612514d35247",
  },
  {
    title: "طرق الاعتناء بالأحبال الصوتية والتغلب علي مشكلاتها",
    image: "https://telegra.ph/file/6a599a2ba1af53cca86ce.png",
    link: "/articles/636cffe06827f582d1ffdcbc",
  },
  {
    title: "الإحترافية في تأدية الشخصيات الصوتية",
    image: "https://telegra.ph/file/13560c2b93fcb4db9b180.jpg",
    link: "/articles/6363815515d3ebe804169dcb",
  },
  {
    title: "الكورس المكثف مع احمد اسماعيل",
    image: "https://telegra.ph/file/589746268097dcad161f8.jpg",
    link: "/articles/6339d8e5eb8c933b9fd29f12",
  },
  // {
  //   title: "ورشه التمثيل الاذاعي",
  //   image: "https://telegra.ph/file/7138466c6c7f4d4c8c9d3.jpg",
  //   link: "/articles/6339d91beb8c933b9fd29f15",
  // },
  {
    title: "عيناتك الصوتيه هي سيرتك الذاتية فكيف تعدها ؟",
    image: "https://telegra.ph/file/e71c30ac5a9c11335b16c.jpg",
    link: "/articles/6339d957eb8c933b9fd29f18",
  },
  // {
  //   title: "متطلبات قراءة النشرة الاخبارية",
  //   image: "https://telegra.ph/file/b02e87a3d04acb12c182e.png",
  //   link: "/articles/6339d983eb8c933b9fd29f1b",
  // },
  // {
  //   title: "بادر بالحجز الان",
  //   image: "https://telegra.ph/file/68394e49c079a55a0a7e9.jpg",
  //   link: "/articles/6339d9aaeb8c933b9fd29f1e",
  // },
];
const SidePanel = () => {
  const router = useRouter();
  const handleRoute = (link: string) => {
    router.push(link);
  };

  return (
    <div className=" mb-4">
      <div className="hidden lg:block ">
        {data.map((item, index) => (
          <div
            key={index + item.title}
            className="rounded-lg   sm:h-auto  flex flex-col justify-between  shadow-xl bg-slate-700 hover:scale-[1.01] cursor-pointer w-full"
            onClick={() => handleRoute(item.link)}
          >
            <div className="w-full rounded-lg p-3 shadow-sm ">
              <img
                alt={item.title}
                src={item.image}
                className=" object-contain w-full rounded-lg "
              />
            </div>

            <h1 className="flex flex-col justify-between  p-1 text-center rounded-lg ">
              <p className="mt-4 text-sm text-gray-100">{item.title}</p>
            </h1>
          </div>
        ))}
      </div>
      <div className="lg:hidden ">
        <Swiper
          dir="ltr"
          spaceBetween={5}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index + item.title}>
              <div
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  margin: "auto",
                }}
                className="rounded-lg h-80  sm:m-2 w-72 justify-end flex flex-col p-2 shadow-xl  hover:scale-[1.01] cursor-pointer"
                onClick={() => handleRoute(item.link)}
              >
                {item.title.length > 1 && (
                  <blockquote className="p-1 text-center rounded-lg bg-slate-700/50 backdrop-blur-sm ">
                    <p className="text-sm text-gray-100">{item.title}</p>
                  </blockquote>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SidePanel;
