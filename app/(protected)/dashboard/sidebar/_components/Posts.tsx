"use client";

import { Post } from "@prisma/client";

import { ReactSortable } from "react-sortablejs";
import { Input, Spinner } from "@nextui-org/react";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import PostCard from "./PostCard";
import { Button } from "@/components/ui/button";

import { useHandleSidebarData } from "../_hooks/useHandleSidebarData";

type Props = {
  data: { title: string; image: string; id: string }[] | any;
};

function Posts({ data }: Props) {
  const {
    Data,
    setData,
    deletePost,
    searchResults,
    loading,
    handleSearch,
    setSearchResults,
    onSubmit,
  } = useHandleSidebarData(data);
  return (
    <>
      <div className="flex justify-end">
        <Button className="mb-5" onClick={onSubmit}>
          {loading ? <Spinner color="secondary" /> : "حفظ"}
        </Button>
      </div>
      <div>
        <Input
          variant="bordered"
          isClearable
          label="ابحث عن منشور"
          className="w-52"
          onValueChange={handleSearch}
        />
        {searchResults.length > 0 && (
          <Command className="w-fit border border-muted-foreground ">
            <CommandList>
              <CommandGroup heading="Suggestions">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => {
                      setData((current: Post[]) => [...current, result]);
                      setSearchResults([]);
                    }}
                  >
                    <CommandItem>{result.title}</CommandItem>
                  </div>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        )}
      </div>
      <div className="border-2 border-divider rounded-md p-5 mt-5">
        <ReactSortable
          animation={150}
          list={Data}
          setList={setData}
          className="space-y-5"
        >
          {Data.map((post: Post) => (
            <PostCard
              key={post.id}
              src={post.image}
              title={post.title}
              deletePost={() => {
                deletePost(post.id);
              }}
            />
          ))}
        </ReactSortable>
      </div>
    </>
  );
}

export default Posts;
