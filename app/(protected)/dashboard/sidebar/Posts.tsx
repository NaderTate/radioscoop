"use client";
import { ReactSortable } from "react-sortablejs";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Post } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { PulseLoader } from "react-spinners";

function Card({
  src,
  deleteImage,
  title,
}: {
  src: string;
  deleteImage: () => void;
  title: string;
}) {
  return (
    <div className="relative ">
      <RxCross2
        onClick={deleteImage}
        className="w-6 h-6 absolute right-0 top-0 bg-background rounded-bl-md cursor-pointer z-[2]"
      />

      <Image
        width={200}
        height={200}
        src={src}
        alt={"img"}
        className="rounded-md object-contain m-auto"
      />
      {title}
    </div>
  );
}
function Posts({ data, search }: { data: Post[]; search: Function }) {
  const { toast } = useToast();

  const [Data, setData] = useState(data);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const deletePost = (id: any) => {
    setData((current: Post[]) => current.filter((item: Post) => item.id != id));
  };
  return (
    <div>
      <div className="flex justify-end">
        <Button
          className="mb-5"
          onClick={async () => {
            setLoading(true);
            // await updateSchedule(days, Title);
            setLoading(false);
            toast({
              title: "تم الحفظ",
              className: "dark:bg-white dark:text-black bg-gray-800 text-white",
            });
          }}
        >
          {loading ? <PulseLoader size={6} /> : <p>حفظ</p>}
        </Button>
      </div>
      <div
        className="border border-muted-foreground rounded-md p-5 relative"
        dir="ltr"
      >
        <div>
          <Input
            placeholder="Add post"
            className="border-muted-foreground border w-52"
            onChange={async (e) => {
              if (e.target.value.length < 2) setResults([]);
              else {
                setResults(await search(e.target.value));
              }
            }}
          />
          {results.length > 0 && (
            <Command className="w-fit border border-muted-foreground ">
              <CommandList>
                <CommandGroup heading="Suggestions">
                  {results.map((result: Post) => (
                    <div
                      key={result.id}
                      onClick={(e) => {
                        setData((current: Post[]) => [...current, result]);
                        console.log("hi");
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

        <div className="flex flex-wrap gap-5 items-center mt-10">
          <ReactSortable
            animation={150}
            list={Data}
            setList={setData}
            className="flex flex-wrap gap-5 justify-start items-center mx-2"
          >
            {Data.map((post: Post) => (
              <Card
                key={post.id}
                src={post.image}
                title={post.title}
                deleteImage={() => {
                  deletePost(post.id);
                }}
              />
            ))}
          </ReactSortable>
        </div>
      </div>
    </div>
  );
}

export default Posts;
