import Link from "next/link";
import Image from "next/image";
import { Image as NUIImage } from "@nextui-org/image";

type Props = {
  PresentedFeatures: {
    featureTitle: string | null;
    img: string | null;
    id: string | null;
    preparedBy: { name: string | null } | null;
  }[];
  PreparedFeatures: {
    featureTitle: string | null;
    img: string | null;
    id: string | null;
    presenter: { name: string | null } | null;
  }[];
  name: string;
};

const FeaturesSection = ({
  PreparedFeatures,
  PresentedFeatures,
  name,
}: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
      {PreparedFeatures.map((feature) => {
        return (
          <div key={feature.id} className="flex flex-col relative">
            <Link href={{ pathname: `/ep/${feature.id}` }}>
              <NUIImage
                as={Image}
                width={700}
                height={700}
                style={{
                  width: "100%",
                }}
                className="shadow-md shadow-indigo-300/50 m-auto !w-full rounded-md brightness-[.6] object-cover"
                src={feature.img || ""}
                alt=""
              />

              <div className="absolute bottom-24 right-1 font-semibold tracking-wide z-10">
                اعداد {name}
              </div>
              <div className="absolute bottom-16 right-1 font-semibold tracking-wide z-10">
                تقديم {feature.presenter?.name}
              </div>
              <div className="bg-gray-900 p-4 rounded-b-md">
                <p className="text-center">{feature.featureTitle}</p>
              </div>
            </Link>
          </div>
        );
      })}
      {PresentedFeatures.map((feature) => {
        return (
          <div key={feature.id} className="flex flex-col relative h-fit">
            <Link href={{ pathname: `/ep/${feature.id}` }}>
              <img
                className="shadow-md shadow-indigo-300/50 rounded-md  brightness-[.6]"
                src={feature.img || ""}
                alt=""
              />
              <div className="absolute bottom-24 right-1 font-semibold tracking-wide">
                اعداد {feature?.preparedBy?.name}
              </div>
              <div className="absolute bottom-16 right-1 font-semibold tracking-wide">
                تقديم {name}
              </div>
              <div className="bg-gray-900 p-4 rounded-b-md">
                <p className="text-center">{feature.featureTitle}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturesSection;
