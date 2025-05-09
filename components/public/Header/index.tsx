"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import Weather from "./Weather";
import SearchModal from "./SearchModal";
import ThemeToggle from "@/components/ThemeToggle";
import { NavItem, NavContent, NavLink } from "./NavItem";

import { data, radioAcademy } from "./data";
import { useFetchNavbarData } from "./_hooks/useFetchNavbarData";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
const Header = () => {
  const [open, setOpen] = useState(false);
  const { articleTypes, featureTypes, seasons, series, promos } =
    useFetchNavbarData();

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
          <div className="w-20 md:w-auto rounded-xl ">
            <Link href={{ pathname: "/" }}>
              <Image
                alt="Radio scoop"
                src="/new-logo-white.png"
                width={150}
                height={150}
              />
            </Link>
          </div>
        </div>
        <div className=" mt-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-4">
          <nav
            className={`lg:flex w-full lg:h-14 flex-col lg:flex-row justify-between  gap- bg-[#00000060] p-2 rounded-xl self-start lg:opacity-100 z-10 lg:translate-x-0  ${
              open
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full hidden"
            }`}
          >
            <NavLink label="الصفحة الرئيسية" link="/" />
            <NavItem label="أكاديمية الراديو">
              <NavContent>
                <NavItem label="مجلة سكوب">
                  <NavContent>
                    {articleTypes.map((type, i) => {
                      if (type.seasons.length === 0) {
                        return (
                          <NavLink
                            key={type.id}
                            label={type.name}
                            link={`/articles`}
                            queries={{ type: type.id }}
                          />
                        );
                      } else {
                        return (
                          <NavItem key={type.id} label={type.name}>
                            <NavContent>
                              {type.seasons.map((season, i) => {
                                if (season.months.length === 0) {
                                  return (
                                    <NavLink
                                      key={season.year}
                                      label={season.year}
                                      link={`/articles`}
                                      queries={{ type: type.id }}
                                    />
                                  );
                                } else {
                                  return (
                                    <NavItem
                                      key={season.year}
                                      label={season.year}
                                    >
                                      <NavContent>
                                        {season.months.map((month) => (
                                          <NavLink
                                            key={month.id}
                                            label={`شهر ${month.name}`}
                                            link={`/articles`}
                                            queries={{
                                              type: type.id,
                                              month: month.id,
                                            }}
                                          />
                                        ))}
                                      </NavContent>
                                    </NavItem>
                                  );
                                }
                              })}
                            </NavContent>
                          </NavItem>
                        );
                      }
                    })}
                  </NavContent>
                </NavItem>
                {radioAcademy.map((subItem, i) => (
                  <NavLink key={i} label={subItem.title} link={subItem.link} />
                ))}
              </NavContent>
            </NavItem>
            <NavItem label="البرامج">
              <NavContent>
                <NavItem label="الفيتشرات">
                  <NavContent>
                    {featureTypes.map((type) => (
                      <NavLink
                        label={type.name}
                        link={`/features`}
                        queries={{ type: type.id }}
                        key={type.id}
                      />
                    ))}
                  </NavContent>
                </NavItem>
                <NavLink label="ميديا سكووب" link="/media-scoop" />
                <NavLink
                  isExternal
                  label="ما وراء الجريمة"
                  link="https://www.facebook.com/share/1EhoqdKhNV/?mibextid=wwXIfr"
                />
                <NavLink
                  label="البودكاست"
                  link="/media-scoop"
                  queries={{ type: "podcast" }}
                />
                <NavLink label="البرنامج العام" link="/generalProgram" />
                {seasons?.map((season, i) => (
                  <NavItem key={i} label={`برامج ${season.year}`}>
                    <NavContent>
                      {season.months.map((month) => (
                        <NavLink
                          key={month.id}
                          label={`شهر ${month.name}`}
                          link={`/programs`}
                          queries={{ month: month.id }}
                        />
                      ))}
                    </NavContent>
                  </NavItem>
                ))}
              </NavContent>
            </NavItem>
            <NavItem label="مسلسلات FM">
              <NavContent>
                {series.map((item) => (
                  <NavLink
                    key={item.id}
                    label={item.name}
                    link={`/programs/${item.id}`}
                  />
                ))}
                {promos.map((promo) => (
                  <NavLink
                    key={promo.category.id}
                    link={`/promos`}
                    label={`بروموهات ${promo.category.name}`}
                    queries={{ category: promo.category.id }}
                  />
                ))}
              </NavContent>
            </NavItem>

            {data.map((item, i) => (
              <NavLink label={item.title} link={item.link} key={i} />
            ))}
          </nav>
          <div className="self-start flex flex-col items-center w-full lg:w-auto ">
            <div className="flex items-center justify-between gap-4 w-full bg-[#242424bf] p-2 rounded-lg">
              <div
                className="block lg:hidden p-2 cursor-pointer text-white bg-[#62657d94] hover:bg-[#757373b7] rounded-lg hover:text-slate-100 shrink-0 shadow-sm"
                onClick={() => setOpen(!open)}
              >
                <HiOutlineMenuAlt3 size={20} />
              </div>
              <ThemeToggle />
              <Weather />
              <SearchModal />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
