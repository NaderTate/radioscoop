"use client";

import { useEffect, useState } from "react";

import {
  getFeatureTypes,
  getArticleTypes,
  getSeasons,
  getSeries,
  getPromos,
} from "../utils";

import { HeaderProps } from "@/app/types";

export const useFetchNavbarData = () => {
  const [headerData, setHeaderData] = useState<HeaderProps>({
    featureTypes: [],
    seasons: [],
    articleTypes: [],
    series: [],
    promos: [],
  } as HeaderProps);

  useEffect(() => {
    const fetchData = async () => {
      const featureTypes = await getFeatureTypes();
      const seasons = await getSeasons();
      const articleTypes = await getArticleTypes();
      const series = await getSeries();
      const promos = await getPromos();
      setHeaderData({ featureTypes, seasons, articleTypes, series, promos });
    };
    fetchData();
  }, []);

  return headerData;
};
