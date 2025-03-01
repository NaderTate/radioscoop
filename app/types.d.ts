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
import {
  getPromos,
  getArticleTypes,
  getFeatureTypes,
  getSeasons,
  getSeries,
} from "@/components/public/Header/utils";

type HeaderProps = {
  featureTypes: Awaited<ReturnType<typeof getFeatureTypes>>;
  articleTypes: Awaited<ReturnType<typeof getArticleTypes>>;
  seasons: Awaited<ReturnType<typeof getSeasons>>;
  series: Awaited<ReturnType<typeof getSeries>>;
  promos: Awaited<ReturnType<typeof getPromos>>;
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
