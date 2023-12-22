"use client";

import { addArticleMonth } from "@/actions/articles";
import { useState } from "react";

export const useHandleArticleMonthData = (
  years: { id: string; year: string }[]
) => {
  const [monthData, setMonthData] = useState({
    monthName: "",
    yearId: years[0].id,
  });

  const isMissingData = !(monthData.monthName && monthData.yearId);

  const onSubmit = async () => {
    addArticleMonth(monthData);
  };

  return {
    monthData,
    setMonthData: setMonthData,
    isMissingData,
    onSubmit,
  };
};
