"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Search from "./Search";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
const data = [
  { title: "الصفحة الرئيسية", link: "/", content: [] },
  {
    title: "اكاديمية الراديو",
    link: "/articles",
    content: [
      {
        title: "ورشة التعليق الصوتي الاقوي والافضل",
        link: "/articles/6339d8b3eb8c933b9fd29f0f",
        content: [],
      },
      {
        title: "الكورس المكثف مع احمد اسماعيل",
        link: "/articles/6339d8e5eb8c933b9fd29f12",
        content: [],
      },
      {
        title: "ورشة التمثيل الاذاعي",
        link: "/articles/6339d91beb8c933b9fd29f15",
        content: [],
      },
      {
        title: "الكورس الشامل",
        link: "/articles/6339d957eb8c933b9fd29f18",
        content: [],
      },
      {
        title: "ليه اختار التدريب في راديو سكووب",
        link: "/articles/6339d9aaeb8c933b9fd29f1e",
        content: [],
      },
    ],
  },
  {
    title: "البرامج",
    link: "/program",
    content: [
      // { title: "الفيتشرات الاذاعيه", link: "/features", content: [] },
      {
        title: "فيتشرات رمضان 2023",
        link: "/feature?type=ramadan-2023",
        content: [],
      },
      {
        title: "فيتشرات العيد",
        link: "/feature?type=eid-fetr-2023",
        content: [],
      },
      {
        title: "فيتشرات صيف 2023",
        link: "/feature?type=summer-2023",
        content: [],
      },
      {
        title: "مسلسلات FM",
        link: "ep?search=ادم%20و%20حياة",
        content: [],
      },
      {
        title: "ميديا سكووب",
        link: "/media-scoop",
        content: [],
      },
      {
        title: "البرنامج العام",
        link: "/ep/general",
        content: [
          {
            title: "2023",
            link: "",
            content: [
              {
                title: "شهر يناير",
                link: "/ep/general?general=jan-2023",
                content: [],
              },
              {
                title: "شهر فبراير",
                link: "/ep/general?general=feb-2023",
                content: [],
              },
            ],
          },
        ],
      },
      {
        title: "برامج 2023",
        link: "/features/?search=2023",
        content: [
          {
            title: "شهر 2",
            link: "/features?search=2023&month=2",
            content: [],
          },
          {
            title: "رمضان",
            link: "/features?search=2023&month=رمضان",
            content: [],
          },
          {
            title: "شهر 5",
            link: "/features?search=2023&month=5",
            content: [],
          },
          {
            title: "شهر 7",
            link: "/features?search=2023&month=7",
            content: [],
          },
          {
            title: "شهر 9",
            link: "/features?search=2023&month=9",
            content: [],
          },
        ],
      },
      {
        title: "برامج 2022",
        link: "/features/?search=2022",
        content: [
          {
            title: "شهر 2",
            link: "/features?search=2022&month=2",
            content: [],
          },
          {
            title: "رمضان",
            link: "/features?search=2022&month=رمضان",
            content: [],
          },
          {
            title: "شهر 6",
            link: "/features?search=2022&month=6",
            content: [],
          },

          {
            title: "شهر 8",
            link: "/features?search=2022&month=8",
            content: [],
          },

          {
            title: "شهر 10",
            link: "/features?search=2022&month=10",
            content: [],
          },
          {
            title: "شهر 12",
            link: "/features?search=2022&month=12",
            content: [],
          },
        ],
      },
      {
        title: "برامج 2021",
        link: "/features/?search=2021",
        content: [
          {
            title: "شهر 10",
            link: "/features?search=2021&month=10",
            content: [],
          },
          {
            title: "شهر 11",
            link: "/features?search=2021&month=11",
            content: [],
          },
          {
            title: "شهر 12",
            link: "/features?search=2021&month=12",
            content: [],
          },
        ],
      },
    ],
  },
  {
    title: "مجلة سكوب",
    link: "/articles",
    content: [
      {
        title: "مقالات",
        link: "/articles",
        content: [
          {
            title: "شهر مارس ",
            link: "/articles?month=march&type=article",
            content: [],
          },
          {
            title: "شهر ابريل",
            link: "/articles?month=april&type=article",
            content: [],
          },
          {
            title: "شهر مايو",
            link: "/articles?month=may&type=article",
            content: [],
          },
          {
            title: "شهر يونيو",
            link: "/articles?month=june&type=article",
            content: [],
          },
          {
            title: "شهر يوليو",
            link: "/articles?month=july&type=article",
            content: [],
          },
          {
            title: "شهر أغسطس",
            link: "/articles?month=august&type=article",
            content: [],
          },
          {
            title: "شهر سبتمبر",
            link: "/articles?month=septemper&type=article",
            content: [],
          },
        ],
      },
      {
        title: "اخبار محلية",
        link: "/news",
        content: [
          {
            title: "شهر مارس ",
            link: "/news?month=march",
            content: [],
          },

          {
            title: "شهر ابريل",
            link: "/news?month=april",
            content: [],
          },
        ],
      },
      { title: " خواطر ", link: "/articles?type=khwater", content: [] },

      {
        title: "شعر عامي",
        link: "/poem?formal=false",
        content: [],
      },
      {
        title: "شعر فصحي",
        link: "/poem?formal=true",
        content: [],
      },
      {
        title: "فيتشرات صحفية",
        link: "/mediafeatures",
        content: [],
      },
    ],
  },
  { title: "للاستماع والتعليق", link: "/comment", content: [] },
  { title: "تواصل معنا", link: "/contact", content: [] },
];

const Header = () => {
  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch("/api/weather");
      const data = await res.json();
      setWeather(data.weather);
    };
    fetchWeather();
  }, []);

  const [open, setOpen] = useState(false);
  const [weather, setWeather] = useState<any>(null);

  return (
    <header className="bg-[#194F88]">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-10 lg:px-[1.5%]">
        <div className="my-2 flex sm:flex-row justify-between">
          <div className="w-8/12">
            <h1 className="text-2xl font-bold text-slate-100 sm:text-3xl">
              Radio Scoop
            </h1>
            <p className="mt-1.5 text-sm text-slate-200 md:text-base ">
              راديو سكووب : اول راديو اون لاين في مصر بينقل المميزين من متدربيه
              الي الاذاعات ال FM الكبرى
            </p>
          </div>
          <div className="w-20 md:w-auto rounded-xl bg-slate-50">
            <Link href="/">
              <Image alt="logo" src="/favicon.png" width={100} height={100} />
            </Link>
          </div>
        </div>
        <div className=" mt-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-4">
          <nav
            className={`flex flex-col lg:hidden space-y-1 gap-2 grow w-full lg:w-auto duration-300 bg-[#00000060] p-2 rounded-xl transition ${
              open
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full h-0 hidden"
            } `}
          >
            {data.map((item, index) => (
              <NavItem key={"mainNav" + index} item={item} />
            ))}
          </nav>
          <nav className="hidden lg:flex h-14 flex-row justify-between  gap- bg-[#00000060] p-2 rounded-xl self-start">
            {data.map((item, index) => (
              <NavItem key={"mainNav" + index} item={item} />
            ))}
          </nav>
          <div className="self-start flex flex-col items-center w-full lg:w-auto ">
            <div className="flex items-center justify-between gap-4 w-full bg-[#242424bf] p-2 rounded-lg">
              <div
                className="block lg:hidden p-2 cursor-pointer text-white bg-[#62657d94] hover:bg-[#757373b7] rounded-lg hover:text-slate-100 shrink-0 shadow-sm"
                onClick={() => setOpen(!open)}
              >
                <HiOutlineMenuAlt3 className="text-2xl" />
              </div>
              <ThemeToggle />
              {weather && (
                <div className="hidden sm:block">
                  <strong className=" flex gap-4 bg-slate-600/80 text-white uppercase px-5 py-1.5 rounded-full">
                    <span>القاهرة</span>
                    <span dir="ltr">
                      {Math.round(weather?.main.temp - 273.15) + " C°"}
                    </span>
                  </strong>
                </div>
              )}
              <Search />
            </div>
            {weather && (
              <div className="sm:hidden mt-5">
                <strong className=" flex gap-4 bg-slate-600/80 text-white uppercase px-5 py-1.5 rounded-full">
                  <span>القاهرة</span>
                  <span dir="ltr">
                    {Math.round(weather.main.temp - 273.15) + "C°"}
                  </span>
                </strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ item }: { item: any }) => {
  const closeDetails = () => {
    const details = document.querySelectorAll("details");
    details.forEach((detail) => {
      detail.removeAttribute("open");
    });
  };

  if (item.content.length === 0) {
    return (
      <a
        onClick={closeDetails}
        href={item.link}
        className="block whitespace-nowrap overflow-ellipsis px-4 group py-2 text-sm font-semibold rounded-lg text-slate-100 flex-grow hover:text-white hover:bg-[#848da065] border-b border-b-slate-700 md:border-0 lg:text-md xl:text-lg"
      >
        {item.title}
      </a>
    );
  }
  return (
    <details className="group border-b border-b-slate-700 md:border-0 lg:relative ">
      <summary className="flex items-center justify-between hover:bg-[#848da065] group-open:bg-[#848da091] px-4 py-2 rounded-lg cursor-pointer text-slate-100">
        <span className="text-sm lg:text-md font-semibold flex whitespace-nowrap overflow-ellipsis xl:text-lg">
          {item.title}
        </span>
        <span className="ml-auto  transition translate-y-[3px] duration-300 group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </summary>
      <nav className="flex flex-col mt-2 ml-8 group-open:bg-[#848da091] w-full lg:w-fit rounded-md lg:absolute z-40 backdrop-blur-md ">
        {item.content.map((subItem: any, index: number) => (
          <NavItem key={"subNav" + index} item={subItem} />
        ))}
      </nav>
    </details>
  );
};

export default Header;
