import { RiAdminLine } from "react-icons/ri";
import { HiSpeakerphone } from "react-icons/hi";
import { AiOutlineTable } from "react-icons/ai";
import { SiAirplayaudio } from "react-icons/si";
import { ImListNumbered } from "react-icons/im";
import { TbCategoryFilled } from "react-icons/tb";
import { LuPersonStanding } from "react-icons/lu";
import { BsFillPieChartFill } from "react-icons/bs";
import { MdArticle, MdOndemandVideo, MdOutlineAudioFile } from "react-icons/md";

export const menuItems: Array<{
  title: string;
  link: string;
  icon?: React.ReactNode;
}> = [
  {
    title: "الرئيسية",
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
    link: "/dashboard/announcers",
    icon: <LuPersonStanding />,
  },
  {
    title: "البرنامج العام",
    link: "/dashboard/generalProgram",
    icon: <TbCategoryFilled />,
  },
  {
    title: "مسلسلات FM",
    link: "/dashboard/series",
    icon: <MdOndemandVideo />,
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
