import { Category, Month } from "@prisma/client";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import { TiEdit } from "react-icons/ti";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { deleteMonth, updateMonth } from "@/lib/_actions";
import Image from "next/image";
import { DialogClose } from "@radix-ui/react-dialog";
import { BsFillTrash3Fill } from "react-icons/bs";
interface Month_ extends Month {
  categories: Category[];
}
function MonthCard({
  month,
  getPrograms,
}: {
  month: Month_;
  getPrograms: (e: string) => Promise<Category[]>;
}) {
  const [monthName, setMonthName] = useState(month.name);
  const [categories, setCategories] = useState<Category[]>(month.categories);
  const [results, setResults] = useState<Category[]>([]);

  return (
    <div>
      <div className="relative p-5">
        <h1>شهر {month.name}</h1>
        <div className="absolute top-0 right-0">
          <Dialog>
            <DialogTrigger>
              <TiEdit className="cursor-pointer" size={20} />
            </DialogTrigger>
            <DialogContent>
              <Dialog>
                <div className="flex justify-end">
                  <DialogTrigger>
                    <BsFillTrash3Fill className="m-auto ml-0 " fill="red" />
                  </DialogTrigger>
                </div>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>حذف الشهر</DialogTitle>
                    <DialogDescription>
                      هل انت متأكد من حذف شهر {month.name} ؟
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center gap-2">
                    <Button>
                      <DialogClose>الغاء</DialogClose>
                    </Button>
                    <DialogClose>
                      <Button
                        variant={"destructive"}
                        onClick={async () => {
                          await deleteMonth(month.id);
                        }}
                      >
                        حذف
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>

              <DialogHeader>
                <DialogTitle>تعديل الشهر</DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-2">
                <span>شهر</span>
                <Input
                  onChange={(e) => {
                    setMonthName(e.target.value);
                  }}
                  defaultValue={month.name}
                />
              </div>

              <span>البرامج</span>

              <Popover open>
                <PopoverTrigger>
                  <Input
                    placeholder="ابحث عن برنامج"
                    onChange={async (e) => {
                      if (e.target.value.length > 3) {
                        setResults(await getPrograms(e.target.value));
                      } else {
                        setResults([]);
                      }
                    }}
                  />
                </PopoverTrigger>
                {results.length > 0 && (
                  <PopoverContent>
                    {results.map((result, i) => {
                      return (
                        <div key={i}>
                          <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => {
                              setCategories((current) => [...current, result]);
                              setResults([]);
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
                  </PopoverContent>
                )}
              </Popover>

              {
                <div className="flex flex-wrap gap-5">
                  {categories.map((category, i) => {
                    return (
                      <div key={i}>
                        <div className="relative">
                          <RxCross2
                            size={20}
                            className="absolute top-0 right-0 bg-background rounded-bl-md cursor-pointer"
                            onClick={() => {
                              setCategories((current) =>
                                current.filter((item) => item.id != category.id)
                              );
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
              <DialogClose asChild>
                <Button
                  onClick={async () => {
                    await updateMonth(
                      month.id,
                      monthName,
                      categories.map((item) => item.id)
                    );
                  }}
                >
                  حفظ
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default MonthCard;
