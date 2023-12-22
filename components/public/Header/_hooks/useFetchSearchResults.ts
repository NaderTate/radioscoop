"use client";

import { debounce } from "lodash";
import { ChangeEvent, useState } from "react";

import { search } from "../utils";

export const useFetchSearchResults = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{
    programs: {
      name: string;
      id: string;
      img: string;
    }[];
    authors: { name: string; img: string | null; id: string }[];
  }>({ programs: [], authors: [] });

  const resetSearchResults = () => {
    setSearchResults({ programs: [], authors: [] });
  };

  const debouncedSearch = debounce(async (searchQuery) => {
    if (searchQuery.length < 2) return;
    setLoading(true);
    const data = await search(searchQuery);
    setSearchResults(data);
    setLoading(false);
  }, 500);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const searchQuery = event.target.value;
    if (searchQuery.length < 2) resetSearchResults();
    setSearchTerms(searchQuery);
    resetSearchResults();
    debouncedSearch(searchQuery);
  }

  return {
    searchTerms,
    searchResults,
    loading,
    handleInputChange,
    resetSearchResults,
  };
};
