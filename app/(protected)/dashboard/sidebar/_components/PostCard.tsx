import Image from "next/image";

import { RxCross2 } from "react-icons/rx";

type Props = {
  src: string;
  deletePost: () => void;
  title: string;
};

const PostCard = ({ title, src, deletePost }: Props) => {
  return (
    <div className="relative ">
      <RxCross2
        onClick={deletePost}
        className="w-6 h-6 absolute right-0 top-0 bg-background rounded-bl-md cursor-pointer z-[2]"
      />
      <Image
        width={100}
        height={100}
        src={src}
        alt={title}
        className="rounded-md object-contain"
      />
      <h3>{title}</h3>
    </div>
  );
};

export default PostCard;
