"use client";

import Day from "./Day";

import { Day as dayType } from "@/app/types";

function Schedule({ Days, title }: { Days: dayType[] | any; title: string }) {
  return (
    <div className="border border-gray-300/30 bg-slate-100/5 px-4 py-5 mx-3 rounded-lg">
      <div className="bg-slate-400/25 rounded-3xl p-2 text-base font-bold tracking-tight sm:text-2xl md:text-2xl mb-5">
        {title}
      </div>
      <div className="flex flex-col gap-2">
        {Days.map((day: dayType) => {
          return <Day key={day.id} Day={day.name} Images={day.images} />;
        })}
      </div>
    </div>
  );
}

export default Schedule;
