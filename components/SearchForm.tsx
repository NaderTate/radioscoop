"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcSearch } from "react-icons/fc";
function SearchForm({
  content,
}: {
  content:
    | "episodes"
    | "articles"
    | "features"
    | "programs"
    | "media-scoop"
    | "presenters";
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  return (
    <div>
      <div className="min-w-full">
        <form
          className="flex gap-1 flex-col sm:flex-row"
          action="
        "
        >
          <div className="relative">
            <Input
              className=""
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              placeholder="ابحث"
            />
            <div className="absolute left-0 top-0 m-auto bottom-0 flex items-center">
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (searchTerm.length < 1 || content.length < 1) {
                    return;
                  }
                  router.push(`/dashboard/${content}?search=${searchTerm}`);
                }}
                variant="ghost"
              >
                <FcSearch size={25} />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
