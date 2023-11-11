"use client";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Image } from "@nextui-org/image";
import { search } from "@/lib/_actions";
import { Spinner } from "@nextui-org/spinner";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { debounce } from "lodash";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

function SearchPopup() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchTerms.length < 2) return;
      onOpenChange();
      router.push(`/search?search=${searchTerms}`);
      resetSearchResults();
    }
  };
  return (
    <div>
      <div
        className=" text-white bg-[#62657d94] hover:bg-[#757373b7] rounded-full hover:text-slate-100  shadow-sm block px-2 py-1.5 cursor-pointer"
        onClick={onOpen}
      >
        <BiSearch size={20} />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="w-fuldsfl">
        <ModalContent className="p-2 max-h-[95vh] ">
          <ModalBody>
            <div className="relative mt-5" onKeyDown={handleKeyDown}>
              <Input onChange={handleInputChange} placeholder="ابحث..." />
              <div
                className="absolute left-2 top-0 bottom-0 flex items-center"
                onClick={() => {
                  if (searchTerms.length < 2) return;
                  onOpenChange();
                  router.push(`/search?search=${searchTerms}`);
                  resetSearchResults();
                }}
              >
                <BiSearch className="cursor-pointer" size={22} />
              </div>
            </div>
            {loading && <Spinner />}
            {searchResults.programs.length > 0 && (
              <div>
                <h1 className="text-center mb-3">البرامج</h1>
                <div className="flex flex-wrap justify-center gap-5 ">
                  {searchResults.programs.map((program) => {
                    return (
                      <Link
                        href={{ pathname: `/programs/${program.id}` }}
                        key={program.id}
                        onClick={() => {
                          onOpenChange();
                          resetSearchResults();
                        }}
                      >
                        <Image
                          width={135}
                          height={135}
                          className="object-cover rounded-md aspect-square "
                          src={program?.img}
                          alt=""
                        />
                        <h1 className="text-center">{program.name}</h1>
                      </Link>
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
                      <Link
                        href={{ pathname: `/announcers/${author.id}` }}
                        key={author.id}
                        onClick={() => {
                          onOpenChange();
                          resetSearchResults();
                        }}
                      >
                        <Image
                          width={135}
                          height={135}
                          className="object-contain rounded-md"
                          src={
                            author?.img
                              ? author.img
                              : "https://res.cloudinary.com/ddcjbeysn/image/upload/v1699437344/person-gray-photo-placeholder-woman-t-shirt-white-background-131683043_rmfhru.jpg"
                          }
                          alt=""
                        />
                        <h1 className="text-center">{author.name}</h1>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default SearchPopup;
