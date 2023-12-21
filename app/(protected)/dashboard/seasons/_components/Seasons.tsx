"use client";

import YearCard from "./YearCard";
import YearForm from "./YearForm";

import { Year_ } from "@/app/types";

type Props = {
  years: Year_[];
};

function Seasons({ years }: Props) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-center md:justify-normal gap-10">
        {years.map((year) => {
          return <YearCard key={year.id} year={year} />;
        })}
        <YearForm />
      </div>
    </div>
  );
}

export default Seasons;
