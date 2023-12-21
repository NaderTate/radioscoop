import { Chip } from "@nextui-org/react";

import YearForm from "./YearForm";
import MonthCard from "./MonthCard";

import { Year_ } from "@/app/types";
import MonthForm from "./MonthForm";

type Props = {
  year: Year_;
};

const YearCard = ({ year }: Props) => {
  return (
    <div className="border border-muted-foreground rounded-md p-5">
      <div className="flex justify-center">
        <div className="relative p-5">
          <YearForm year={{ id: year.id, name: year.year }} />
          <Chip>{year.year}</Chip>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {year.months.map((month) => {
          return (
            <div
              key={month.id}
              className="flex flex-col items-center text-center"
            >
              <MonthCard month={month} yearId={year.id} />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <MonthForm yearId={year.id} />
      </div>
    </div>
  );
};

export default YearCard;
