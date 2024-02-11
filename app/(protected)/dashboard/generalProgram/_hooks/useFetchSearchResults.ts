"use client";

import { useState } from "react";
import { debounce } from "lodash";

import { addGeneralProgram, getPrograms } from "@/actions/program";

export const useFetchSearchResults = () => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<
    { name: string; img: string; id: string }[]
  >([]);

  const fetchResults = async (searchQuery: string) => {
    if (searchQuery.length < 2) return;
    debouncedSearch(searchQuery);
  };

  const debouncedSearch = debounce(async (searchQuery) => {
    if (searchQuery.length < 2) return;
    setLoading(true);
    const data = await getPrograms(searchQuery);
    setLoading(false);

    // Update the UI with the search results
    setSearchResults(data);
  }, 500);

  const addProgram = async (id: string) => {
    await addGeneralProgram(id);
    setSearchResults([]);
  };

  return { fetchResults, searchResults, loading, addProgram };
};
