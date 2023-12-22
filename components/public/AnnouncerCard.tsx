import Link from "next/link";
import { Image } from "@nextui-org/image";

type Props = {
  id: string;
  name: string;
  img: string | null;
};

function AnnouncerCard({ id, name, img }: Props) {
  return (
    <Link href={{ pathname: `/announcers/${id}` }}>
      <Image
        width={135}
        height={135}
        className="object-contain rounded-md"
        src={
          img
            ? img
            : "https://res.cloudinary.com/ddcjbeysn/image/upload/v1699437344/person-gray-photo-placeholder-woman-t-shirt-white-background-131683043_rmfhru.jpg"
        }
        alt={name}
      />
      <h1 className="text-center">{name}</h1>
    </Link>
  );
}

export default AnnouncerCard;
