"use client";
import { addSeriesProgram, getPrograms } from "@/lib/_actions";
import { ChangeEvent, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Image } from "@nextui-org/image";
import { debounce } from "lodash";
function AddProgramForm() {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<
    { name: string; img: string; id: string }[]
  >([]);
  const fetchResults = async (searchQuery: ChangeEvent<HTMLInputElement>) => {
    if (searchQuery.target.value.length < 2) return;
    debouncedSearch(searchQuery);
  };
  const debouncedSearch = debounce(async (searchQuery) => {
    if (searchQuery.length < 2) return;
    const data = await getPrograms(searchQuery.target.value);
    // Update the UI with the search results
    setSearchResults(data);
  }, 500);
  return (
    <div className="mb-5">
      <Autocomplete
        autoFocus={false}
        label=" اضف برنامج"
        className="max-w-xs"
        onInput={fetchResults}
        items={searchResults}
      >
        {searchResults.map((result) => (
          <AutocompleteItem
            key={result.id}
            value={result.id}
            onClick={async () => {
              setLoading(true);
              await addSeriesProgram(result.id);
              setSearchResults([]);
              setLoading(false);
            }}
          >
            <Image
              width={120}
              height={120}
              src={result.img}
              alt={result.name}
              className="object-cover aspect-square "
            />
            <span className="text-xs mt-2">{result.name}</span>
          </AutocompleteItem>
        ))}
      </Autocomplete>
      {loading && (
        <div className="flex justify-center mt-5">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default AddProgramForm;
