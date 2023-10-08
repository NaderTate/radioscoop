"use client";
import { Button } from "@/components/ui/button";
import Day from "./Day";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { updateSchedule } from "@/lib/_actions";

function Schedule({
  Days,
}: {
  Days:
    | { id: number; name: string; images: { id: string; link: string }[] }[]
    | any;
}) {
  const [days, setDays] =
    useState<
      { id: number; name: string; images: { id: string; link: string }[] }[]
    >(Days);
  const removeDay = (id: number) => {
    setDays(days.filter((day) => day.id !== id));
  };
  return (
    <div>
      <Button
        onClick={async () => {
          await updateSchedule(days);
        }}
      >
        save
      </Button>
      <div className="space-y-5">
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
            onClick={() => {
              setDays([
                ...days,
                {
                  id: days.length + 1,
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
    </div>
  );
}

export default Schedule;
