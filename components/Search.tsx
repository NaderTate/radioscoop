"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BiSearch } from "react-icons/bi";
import { debounce } from "lodash";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { DialogClose } from "@radix-ui/react-dialog";
import { Spinner } from "@nextui-org/spinner";
function Search({ search }: { search: Function }) {
  const [loading, setLoading] = useState(false);
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{
    programs: {
      name: string;
      id: string;
      img: string;
    }[];
    authors: { name: string; img: string; id: string }[];
  }>({ programs: [], authors: [] });
  const router = useRouter();
  const resetSearchResults = () => {
    setSearchResults({ programs: [], authors: [] });
  };
  const debouncedSearch = debounce(async (searchQuery) => {
    // Make your Prisma query here and update the UI
    if (searchQuery.length < 2) return;
    setLoading(true);
    const data = await search(searchQuery);
    // Update the UI with the search results
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
  return (
    <Dialog>
      <DialogTrigger>
        <div className=" text-white bg-[#62657d94] hover:bg-[#757373b7] rounded-full hover:text-slate-100  shadow-sm block px-2 py-1.5">
          <BiSearch size={20} className=" " />
        </div>
      </DialogTrigger>
      <DialogContent className="rounded-md max-h-[80vh] overflow-auto">
        <div className="relative mt-5">
          <Input onChange={handleInputChange} placeholder="ابحث..." />
          <div className="absolute left-2 top-0 bottom-0 flex items-center">
            <DialogClose asChild>
              <BiSearch
                className="cursor-pointer"
                size={22}
                onClick={() => {
                  if (searchTerms.length < 2) return;
                  router.push(`/search?search=${searchTerms}`);
                  resetSearchResults();
                }}
              />
            </DialogClose>
          </div>
        </div>
        {loading && <Spinner />}
        {searchResults.programs.length > 0 && (
          <div>
            <h1 className="text-center mb-3">البرامج</h1>
            <div className="flex flex-wrap justify-center gap-5 ">
              {searchResults.programs.map((program) => {
                return (
                  <DialogClose asChild>
                    <Link href={{ pathname: `/programs/${program.id}` }}>
                      <Image
                        width={135}
                        height={135}
                        className="object-contain rounded-md"
                        src={program.img}
                        alt=""
                      />
                      <h1 className="text-center">{program.name}</h1>
                    </Link>
                  </DialogClose>
                );
              })}
            </div>
          </div>
        )}
        {searchResults.authors.length > 0 && (
          <div>
            <h1 className="text-center mb-3">المذيعين</h1>
            <div className="flex flex-wrap justify-center gap-5">
              {searchResults.authors.map((author) => {
                return (
                  <DialogClose asChild>
                    <Link href={{ pathname: `/authors/${author.id}` }}>
                      <Image
                        width={135}
                        height={135}
                        className="object-contain rounded-md"
                        src={
                          author?.img?.length > 3
                            ? author.img
                            : "https://res.cloudinary.com/ddcjbeysn/image/upload/v1699437344/person-gray-photo-placeholder-woman-t-shirt-white-background-131683043_rmfhru.jpg"
                        }
                        alt=""
                      />
                      <h1 className="text-center">{author.name}</h1>
                    </Link>
                  </DialogClose>
                );
              })}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default Search;
