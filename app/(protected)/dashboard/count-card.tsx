import { ReactNode } from "react";

type Props = {
  label: string;
  icon: ReactNode;
  count: number;
};

const CountCard = ({ label, icon, count }: Props) => {
  return (
    <div className="border-2 border-divider rounded-md p-5 w-56">
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between">
          <h5>{label}</h5>
          {icon}
        </div>
        <div className="mt-2">
          <h1 className="font-bold text-xl">{count}</h1>
        </div>
      </div>
    </div>
  );
};

export default CountCard;
