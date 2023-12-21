import Image from "next/image";
import { Input } from "@nextui-org/react";
import { DialogClose } from "@radix-ui/react-dialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { TiEdit } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { useHandleMonthData } from "../_hooks/useHandleMonthData";
import { deleteMonth } from "@/actions/months";

type Props = {
  yearId: string;
  month?: {
    id: string;
    name: string;
    categories: { id: string; name: string; img: string }[];
  };
};

const MonthForm = ({ yearId, month }: Props) => {
  const {
    monthData,
    setMonthData,
    handleSearch,
    searchResults,
    setSearchResults,
    onSubmit,
  } = useHandleMonthData(yearId, month);

  return (
    <Dialog>
      <DialogTrigger>
        {month ? (
          <TiEdit className="cursor-pointer" size={20} />
        ) : (
          <div className="bg-primary p-1 text-secondary-50 rounded-full">
            <AiOutlinePlusCircle size={25} />
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto pb-0">
        <DialogHeader>
          <DialogTitle> {month ? "تعديل الشهر" : "اضافة شهر"}</DialogTitle>
        </DialogHeader>
        {month && (
          <DialogClose>
            <BsFillTrash3Fill
              className="m-auto ml-0 cursor-pointer"
              fill="red"
              onClick={async () => {
                await deleteMonth(month.id);
              }}
            />
          </DialogClose>
        )}

        <Input
          startContent="شهر"
          defaultValue={monthData.name}
          variant="bordered"
          onValueChange={(e) => {
            setMonthData((current) => ({ ...current, name: e }));
          }}
        />
        {month && (
          <>
            <span>البرامج</span>
            <div className="relative">
              <Input
                variant="bordered"
                label="ابحث عن برنامج"
                onValueChange={handleSearch}
              />
              {searchResults.length > 0 && (
                <div className="absolute z-20 bg-primary-50 p-2 rounded-md border-2 border-divider space-y-2">
                  {searchResults.map((result) => {
                    return (
                      <div key={result.id}>
                        <div
                          className="flex items-center gap-2 cursor-pointer hover:bg-primary-100 p-2 rounded-md transition-colors"
                          onClick={() => {
                            setMonthData((current) => ({
                              ...current,
                              categories: [
                                { ...result },
                                ...current.categories,
                              ],
                            }));
                            setSearchResults([]);
                          }}
                        >
                          <Image
                            src={result.img}
                            width={50}
                            height={50}
                            alt={result.name}
                            className="rounded-md"
                          />
                          <span>{result.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {
              <div className="flex flex-wrap gap-5">
                {monthData.categories.map((category) => {
                  return (
                    <div key={category.id}>
                      <div className="relative">
                        <RxCross2
                          size={20}
                          className="absolute top-0 right-0 bg-background rounded-bl-md cursor-pointer"
                          onClick={() => {
                            setMonthData((current) => ({
                              ...current,
                              categories: current.categories.filter(
                                (c) => c.id !== category.id
                              ),
                            }));
                          }}
                        />
                        <Image
                          src={category.img}
                          width={100}
                          height={100}
                          alt={category.name}
                          className="rounded-md"
                        />
                      </div>
                      <h1 className="text-center">{category.name}</h1>
                    </div>
                  );
                })}
              </div>
            }
          </>
        )}

        <DialogClose asChild>
          <Button className="sticky bottom-0" onClick={onSubmit}>
            حفظ
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default MonthForm;
