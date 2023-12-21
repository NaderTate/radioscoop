import MonthForm from "./MonthForm";

type Props = {
  yearId: string;
  month: {
    id: string;
    name: string;
    categories: { id: string; name: string; img: string }[];
  };
};
function MonthCard({ month, yearId }: Props) {
  return (
    <div className="relative p-5">
      <h1>شهر {month.name}</h1>
      <div className="absolute top-0 right-0">
        <MonthForm month={month} yearId={yearId} />
      </div>
    </div>
  );
}

export default MonthCard;
