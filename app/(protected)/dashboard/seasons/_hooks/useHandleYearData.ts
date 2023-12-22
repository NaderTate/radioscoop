"use client";

import { useState } from "react";

import { addYear, updateYear } from "@/actions/years";

export const useHanldeYearData = (year?: { id: string; name: string }) => {
  const [yearData, setYearData] = useState({ name: year?.name || "" });

  const onSubmit = async () => {
    if (year?.id) {
      await updateYear(year.id, yearData.name);
    } else {
      await addYear(yearData.name);
      setYearData({ name: "" });
    }
  };
  return { yearData, setYearData, onSubmit };
};
