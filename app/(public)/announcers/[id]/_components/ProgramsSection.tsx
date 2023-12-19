import Link from "next/link";
import Image from "next/image";
import { Image as NUIImage } from "@nextui-org/image";

type Props = {
  Categories: {
    id: string;
    img: string;
    name: string;
    month: { name: string; year: { year: string } } | null;
  }[];
};

const ProgramsSection = ({ Categories }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {Categories.map((category) => {
        return (
          <Link
            key={category.id}
            href={{ pathname: `/programs/${category.id}` }}
          >
            <NUIImage
              as={Image}
              width={200}
              height={200}
              className="object-cover aspect-square rounded-t-md rounded-b-none"
              src={category.img}
              alt=""
            />
            <div className="bg-gray-900 p-4 rounded-b-md">
              <p className="text-xs text-gray-500">
                {category?.month?.year.year} / {category?.month?.name}
              </p>

              <h5 className="text-sm text-white">{category.name}</h5>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProgramsSection;
