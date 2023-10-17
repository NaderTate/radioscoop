"use client";
import { Category, Month, Year } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import MonthCard from "./MonthCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { addMonth, addYear, deleteYear, updateYear } from "@/lib/_actions";
import { TiEdit } from "react-icons/ti";
import { BsFillTrash3Fill } from "react-icons/bs";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
interface Month_ extends Month {
  categories: Category[];
}
interface Year_ extends Year {
  months: Month_[];
}
function Seasons({
  years,
  getPrograms,
}: {
  years: Year_[];
  getPrograms: (e: string) => Promise<Category[]>;
}) {
  const [monthName, setMonthName] = useState("");
  const [year, setYear] = useState<string>("");
  return (
    <div>
      <div className="flex flex-wrap items-start justify-center md:justify-normal gap-10">
        {years.map((year, i) => {
          return (
            <div key={i}>
              <div className=" flex gap-10">
                <div className="border border-muted-foreground rounded-md p-5">
                  <div className="flex justify-center">
                    <div className="relative p-5">
                      <div className="absolute top-0 right-0">
                        <Dialog>
                          <DialogTrigger>
                            <TiEdit className="cursor-pointer" size={20} />
                          </DialogTrigger>
                          <DialogContent>
                            <Dialog>
                              <div className="flex justify-end">
                                <DialogTrigger>
                                  <BsFillTrash3Fill
                                    className="m-auto ml-0 "
                                    fill="red"
                                  />
                                </DialogTrigger>
                              </div>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>حذف السنة</DialogTitle>
                                  <DialogDescription>
                                    هل انت متأكد من حذف السنة {year.year} ؟
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
                                        await deleteYear(year.id);
                                      }}
                                    >
                                      حذف
                                    </Button>
                                  </DialogClose>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <DialogHeader>
                              <DialogTitle>تعديل السنة </DialogTitle>
                            </DialogHeader>
                            <Input
                              defaultValue={year.year}
                              placeholder="year"
                              onChange={(e) => {
                                setMonthName(e.target.value);
                              }}
                            />
                            <DialogClose asChild>
                              <Button
                                onClick={async () => {
                                  await updateYear(year.id, monthName);
                                }}
                              >
                                حفظ
                              </Button>
                            </DialogClose>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <Button
                        variant={"secondary"}
                        className="m-auto cursor-default"
                      >
                        {year.year}
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5 mt-5">
                    {year.months.map((month, i) => {
                      return (
                        <div
                          key={i}
                          className="flex flex-col  items-center text-center "
                        >
                          <MonthCard month={month} getPrograms={getPrograms} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-center">
                    <Dialog>
                      <DialogTrigger>
                        <Button className="">
                          <AiOutlinePlusCircle size={25} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>اضافة شهر</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center gap-2">
                          <span>شهر</span>
                          <Input
                            placeholder="month"
                            onChange={(e) => {
                              setMonthName(e.target.value);
                            }}
                          />
                        </div>
                        <DialogClose asChild>
                          <Button
                            onClick={() => {
                              addMonth(year.id, monthName);
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
            </div>
          );
        })}
        <Dialog>
          <DialogTrigger>
            <Button>
              اضافة سنة <AiOutlinePlusCircle size={25} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>اضافة سنة</DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <Input
                placeholder="السنة"
                onChange={(e) => {
                  setYear(e.target.value);
                }}
              />
            </div>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  addYear(year);
                }}
              >
                حفظ
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Seasons;
