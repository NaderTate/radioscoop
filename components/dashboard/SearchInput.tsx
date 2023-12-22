"use client";

import { Route } from "next";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { KeyboardEvent, useState } from "react";

import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const SearchInput = () => {
  const [searchKeywords, setSearchKeywords] = useState("");
  const page = usePathname() as Route;
  const router = useRouter();

  const handleSubmit = () => {
    router.push(`${page}?search=${searchKeywords}`);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Input
      className="w-64 ml-10 sm:ml-0"
      variant="bordered"
      label="ابحث..."
      value={searchKeywords}
      onValueChange={setSearchKeywords}
      endContent={
        <div className="m-auto flex items-center gap-2">
          {searchKeywords !== "" && (
            <RxCross2
              className=" cursor-pointer text-default-500 hover:text-default-700 transition-colors"
              size={15}
              onClick={() => {
                setSearchKeywords("");
                router.push(`${page}`);
              }}
            />
          )}
          <IoSearch
            className="cursor-pointer"
            size={20}
            onClick={handleSubmit}
          />
        </div>
      }
      onKeyDown={handleKeyPress}
    />
  );
};

export default SearchInput;
