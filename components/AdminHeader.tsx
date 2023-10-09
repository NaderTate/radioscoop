"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "./ThemeToggle";

import { MdArticle, MdOndemandVideo, MdOutlineAudioFile } from "react-icons/md";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BsFillPieChartFill } from "react-icons/bs";
import { TbCategoryFilled } from "react-icons/tb";
import { ImListNumbered } from "react-icons/im";
import { LuPersonStanding } from "react-icons/lu";
import { HiSpeakerphone } from "react-icons/hi";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineTable } from "react-icons/ai";
import { SiAirplayaudio } from "react-icons/si";
import { Separator } from "@/components/ui/separator";
const menuItems: Array<{
  title: string;
  link: string;
  icon?: React.ReactNode;
}> = [
  {
    title: "لوحة التحكم",
    link: "/dashboard",
    icon: <BsFillPieChartFill />,
  },
  {
    title: "الحلقات",
    link: "/dashboard/episodes",
    icon: <MdOutlineAudioFile />,
  },
  {
    title: "الفيتشرات",
    link: "/dashboard/features",
    icon: <SiAirplayaudio />,
  },
  {
    title: "البرامج",
    link: "/dashboard/programs",
    icon: <TbCategoryFilled />,
  },
  {
    title: "المواسم",
    link: "/dashboard/seasons",
    icon: <ImListNumbered />,
  },

  {
    title: "المقالات",
    link: "/dashboard/articles",
    icon: <MdArticle />,
  },
  {
    title: "ميديا سكووب",
    link: "/dashboard/media-scoop",
    icon: <MdOndemandVideo />,
  },
  {
    title: "الجدول",
    link: "/dashboard/schedule",
    icon: <AiOutlineTable />,
  },
  {
    title: "المذيعين",
    link: "/dashboard/presenters",
    icon: <LuPersonStanding />,
  },
  {
    title: "الاعلانات",
    link: "/dashboard/sidebar",
    icon: <HiSpeakerphone />,
  },
  {
    title: "المسؤولين",
    link: "/dashboard/admins",
    icon: <RiAdminLine />,
  },
];
function AdminHeader() {
  const { data: session }: any = useSession();
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <GiHamburgerMenu size={25} />
        </SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle className="m-auto mr-0">
              <Link href={{ pathname: "/" }}>
                <SheetClose>
                  <Image
                    alt="logo"
                    src={"/favicon.png"}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </SheetClose>
              </Link>
            </SheetTitle>
            <div className="flex flex-col items-start font-bold tracking-wider ">
              {menuItems.map((item) => (
                <Link href={{ pathname: item.link }} key={item.title}>
                  <SheetDescription className="my-2">
                    <SheetClose>
                      <div className="navItem">
                        <div className="flex items-center gap-5 text-base ">
                          {item.icon}
                          {item.title}
                        </div>
                      </div>
                    </SheetClose>
                  </SheetDescription>
                </Link>
              ))}
              <ThemeToggle />
              <Separator className="bg-muted-foreground my-2" />
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src={session?.user?.image} />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center mx-2">
                  <span className="text-base font-bold">
                    {session?.user?.name}
                  </span>
                </div>
              </div>
              <span className="font-light text-sm my-2">
                {session?.user?.email}
              </span>
              <Button>
                <FiLogOut onClick={() => signOut()} />
                تسجيل الخروج
              </Button>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AdminHeader;
