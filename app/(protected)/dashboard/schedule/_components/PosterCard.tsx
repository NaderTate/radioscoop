import Image from "next/image";
import { Image as NUIImage } from "@nextui-org/react";

import { RxCross2 } from "react-icons/rx";

type Props = { img: string; deleteImage: () => void };

const PosterCard = ({ img, deleteImage }: Props) => {
  return (
    <div className="relative ">
      <RxCross2
        onClick={deleteImage}
        className="w-6 h-6 absolute right-0 top-0 bg-background rounded-bl-md cursor-pointer z-20"
      />

      {img && (
        <NUIImage
          as={Image}
          width={200}
          height={200}
          src={img}
          alt={"img"}
          className="rounded-md object-contain "
        />
      )}
    </div>
  );
};

export default PosterCard;
