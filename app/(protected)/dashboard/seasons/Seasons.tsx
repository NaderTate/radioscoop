"use client";
import { Year } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function Seasons({ years }: { years: Year[] }) {
  return (
    <div>
      <div className="flex flex-wrap gap-10">
        {years.map((year, i) => {
          return (
            <div key={i}>
              <div className=" flex gap-10">
                <div>
                  <div className="flex justify-center">
                    <Button variant={"secondary"} className="m-auto">
                      {year.year}
                    </Button>
                  </div>
                  <div className="flex flex-col gap-5 mt-5">
                    {year.months.map((month, i) => {
                      return (
                        <div
                          key={i}
                          className="flex flex-col  items-center text-center "
                        >
                          <div className="relative p-5">
                            <h1>شهر {month}</h1>
                            <div className="absolute top-0 right-0">
                              <Dialog>
                                <DialogTrigger>
                                  <TiEdit
                                    className="cursor-pointer"
                                    size={20}
                                  />
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle></DialogTitle>
                                  </DialogHeader>
                                  <div className="flex items-center gap-2">
                                    <span>شهر</span>
                                    <Input defaultValue={month} />
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-center">
                    <Button className="my-5">
                      <AiOutlinePlusCircle size={25} />
                    </Button>
                  </div>
                </div>
                {i === years.length - 1 ? null : (
                  <Separator
                    orientation="vertical"
                    className="bg-white w-0.5 min-h-[80vh]"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Seasons;
