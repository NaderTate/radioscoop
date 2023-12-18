"use client";
import { Button } from "@/components/ui/button";
import Day from "./Day";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { updateSchedule } from "@/lib/_actions";
import { Input } from "@/components/ui/input";
import { PulseLoader } from "react-spinners";
import { useToast } from "@/components/ui/use-toast";

function Schedule({ Days, title }: { Days: Day[] | any; title: string }) {
  const { toast } = useToast();

  const [days, setDays] = useState<Day[]>(Days);
  const [Title, setTitle] = useState(title);
  const [loading, setLoading] = useState(false);

  const removeDay = (id: number) => {
    setDays(days.filter((day) => day.id !== id));
  };
  return (
    <div>
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
          {loading ? <PulseLoader size={6} /> : <p>حفظ</p>}
        </Button>
      </div>
      <div className="space-y-5">
        <div className="flex justify-center">
          <Input
            placeholder="title"
            className="text-center w-52  border border-muted-foreground"
            defaultValue={Title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
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
