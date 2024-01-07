"use client";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Image as NUIImage,
  Spinner,
  Input,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useFetchSearchResults } from "./_hooks/useFetchSearchResults";

import { BiSearch } from "react-icons/bi";

function SearchModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const {
    searchResults,
    searchTerms,
    handleInputChange,
    loading,
    resetSearchResults,
  } = useFetchSearchResults();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchTerms.length < 2) return;
      onOpenChange();
      router.push(`/search?search=${searchTerms}`);
      resetSearchResults();
    }
  };
  return (
    <>
      <div
        className=" text-white bg-[#62657d94] hover:bg-[#757373b7] rounded-full hover:text-slate-100  shadow-sm block px-2 py-1.5 cursor-pointer"
        onClick={onOpen}
      >
        <BiSearch size={20} />
      </div>
      <Modal
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
      >
        <ModalContent className="p-2 max-h-[95vh] overflow-auto">
          <ModalBody>
            <Input
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              label="ابحث..."
              autoFocus
              endContent={
                <BiSearch
                  className="cursor-pointer m-auto"
                  size={22}
                  onClick={() => {
                    if (searchTerms.length < 2) return;
                    onOpenChange();
                    router.push(`/search?search=${searchTerms}`);
                    resetSearchResults();
                  }}
                />
              }
            />
            {loading && <Spinner />}
            {searchResults.programs.length > 0 && (
              <>
                <h5 className="text-center mb-3">البرامج</h5>
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
                        <NUIImage
                          width={135}
                          height={135}
                          className="object-cover rounded-md aspect-square "
                          src={program?.img}
                          alt={program.name}
                        />
                        <h6 className="text-center">{program.name}</h6>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
            {searchResults.authors.length > 0 && (
              <>
                <h5 className="text-center mb-3">المذيعين</h5>
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
                        <NUIImage
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
                        <h6 className="text-center">{author.name}</h6>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SearchModal;
