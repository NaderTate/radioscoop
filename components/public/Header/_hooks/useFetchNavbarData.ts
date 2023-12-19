"use client";

import { useEffect, useState } from "react";
import { getFeatureTypes, getArticleTypes, getSeasons } from "../utils";
export const useFetchNavbarData = () => {
  const [headerData, setHeaderData] = useState<HeaderProps>({
    featureTypes: [],
    seasons: [],
    articleTypes: [],
  } as HeaderProps);
  useEffect(() => {
    const fetchData = async () => {
      const featureTypes = await getFeatureTypes();
      const seasons = await getSeasons();
      const articleTypes = await getArticleTypes();
      setHeaderData({ featureTypes, seasons, articleTypes });
    };
    fetchData();
  }, []);
  return headerData;
};
