"use client";

import { useState } from "react";

import { addMonth, updateMonth } from "@/actions/months";

import { getPrograms } from "@/actions/program";

export const useHandleMonthData = (
  yearId: string,
  month?: {
    id: string;
    name: string;
    categories: { id: string; name: string; img: string }[];
  }
) => {
  const [monthData, setMonthData] = useState({
    name: month?.name || "",
    categories: month?.categories || [],
  });

  const [searchResults, setSearchResults] = useState<
    { id: string; name: string; img: string }[]
  >([]);

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm || searchTerm.length < 2) {
      setSearchResults([]);
      return;
    }
    const programs = await getPrograms(searchTerm);
    setSearchResults(programs);
  };

  const onSubmit = async () => {
    if (!month) {
      console.log("monthData", monthData);
      await addMonth(yearId, monthData.name);
    } else {
      await updateMonth(month.id, {
        name: monthData.name,
        prgramsIDs: monthData.categories.map((category) => category.id),
      });
    }
  };
  return {
    monthData,
    setMonthData,
    searchResults,
    setSearchResults,
    handleSearch,
    onSubmit,
  };
};
