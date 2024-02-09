interface Day {
  id: number;
  name: string;
  images: { id: string; link: string }[];
}
interface Post {
  id: string;
  title: string;
  image: string;
}

type HeaderProps = {
  featureTypes: { id: string; name: string }[];
  articleTypes: {
    name: string;
    id: string;
    seasons: {
      year: number;
      months: { id: string; name: string }[];
    }[];
  }[];
  seasons: { year: string; months: { id: string; name: string }[] }[];
};
import { Category, Month, Year } from "@prisma/client";

interface Month_ extends Month {
  categories: Category[];
}
interface Year_ extends Year {
  months: Month_[];
}

type category = {
  name: string;
  img: string;
  author: { name: string }[];
} | null;
