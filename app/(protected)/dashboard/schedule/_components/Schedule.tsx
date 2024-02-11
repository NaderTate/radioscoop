"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";

import Day from "./Day";
import { updateSchedule } from "../utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { AiOutlinePlusCircle } from "react-icons/ai";

import { Day as DayType } from "@/app/types";

function Schedule({ Days, title }: { Days: DayType[] | any; title: string }) {
  const { toast } = useToast();

  const [days, setDays] = useState<DayType[]>(Days);
  const [Title, setTitle] = useState(title);
  const [loading, setLoading] = useState(false);

  const removeDay = (id: number) => {
    setDays(days.filter((day) => day.id !== id));
  };
  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={async () => {
            setLoading(true);
            await updateSchedule(days, Title);
            setLoading(false);
            toast({
              title: "تم الحفظ",
              className: "dark:bg-white dark:text-black bg-gray-800 text-white",
            });
          }}
        >
          {loading ? <Spinner color="secondary" /> : "حفظ"}
        </Button>
      </div>
      <div className="space-y-5">
        <div className="flex justify-center">
          <Input
            label="title"
            defaultValue={Title}
            onValueChange={setTitle}
            className="w-80"
            variant="bordered"
          />
        </div>
        {days.map((day) => {
          return (
            <Day
              updateData={(name, images) => {
                // update the day name and images
                setDays(
                  days.map((d) => {
                    if (d.id === day.id) {
                      return {
                        ...d,
                        name,
                        images,
                      };
                    }
                    return d;
                  })
                );
              }}
              name={day.name}
              images={day.images}
              removeDay={() => {
                removeDay(day.id);
              }}
              key={day.id}
            />
          );
        })}

        <div className="flex justify-center">
          <Button
            className="mb-5"
            onClick={() => {
              setDays([
                ...days,
                {
                  id: Math.ceil(Math.random() * 1000),
                  name: `day ${days.length + 1}`,
                  images: [],
                },
              ]);
            }}
          >
            <AiOutlinePlusCircle size={25} />
          </Button>
        </div>
      </div>
    </>
  );
}

export default Schedule;
