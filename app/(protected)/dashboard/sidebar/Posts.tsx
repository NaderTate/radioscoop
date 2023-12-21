"use client";
import { ReactSortable } from "react-sortablejs";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useToast } from "@/components/ui/use-toast";
import { PulseLoader } from "react-spinners";
import { updateSidebar } from "@/lib/_actions";
import { Post } from "@prisma/client";

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
      <h1 className="text-center">{title}</h1>
    </div>
  );
}
function Posts({
  data,
  search,
}: {
  data: Post[] | any;
  search: (e: string) => Promise<Post[]>;
}) {
  const { toast } = useToast();

  const [Data, setData] = useState(data);
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const deletePost = (id: string) => {
    setData((current: Post[]) => current.filter((item: Post) => item.id != id));
  };
  console.log(Data);
  return (
    <div>
      <div className="flex justify-end">
        <Button
          className="mb-5"
          onClick={async () => {
            setLoading(true);
            await updateSidebar(Data.map((item: Post) => item));
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
          <div className="relative w-52">
            <Input
              ref={searchRef}
              placeholder="ابحث عن منشور"
              className="border-muted-foreground border w-52"
              onChange={async (e) => {
                if (e.target.value.length < 2) setResults([]);
                else {
                  setResults(await search(e.target.value));
                }
              }}
            />
            <RxCross2
              onClick={() => {
                searchRef.current?.value && (searchRef.current.value = "");

                setResults([]);
              }}
              className="absolute right-2 top-0 bottom-0 m-auto cursor-pointer opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              size={18}
            />
          </div>
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
