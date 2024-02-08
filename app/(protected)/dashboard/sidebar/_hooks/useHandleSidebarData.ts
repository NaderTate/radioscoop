"use client";

import { Post } from "@prisma/client";

import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";

import { search, updateSidebar } from "../utils";

export const useHandleSidebarData = (
  data: { title: string; image: string; id: string }[] | any
) => {
  const { toast } = useToast();

  const [Data, setData] = useState(data);

  const [searchTerms, setSearchTerms] = useState<string>("");
  const [searchResults, setSearchResults] = useState<
    { title: string; image: string; id: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const deletePost = (id: string) => {
    setData((current: Post[]) => current.filter((item: Post) => item.id != id));
  };

  const handleSearch = async (e: string) => {
    if (e.length < 2) setSearchResults([]);
    else {
      setSearchResults(await search(e));
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    await updateSidebar(Data.map((item: Post) => item.id));
    setLoading(false);
    toast({
      title: "تم الحفظ",
      className: "dark:bg-white dark:text-black bg-gray-800 text-white",
    });
  };
  return {
    Data,
    setData,
    loading,
    setSearchTerms,
    searchResults,
    setSearchResults,
    deletePost,
    onSubmit,

    handleSearch,
  };
};
