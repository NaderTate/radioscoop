import Link from "next/link";
import Image from "next/image";

import { Video } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VideoForm from "./VideoForm";
import DeleteButton from "@/components/dashboard/ConfirmDelete";

import { deleteVideo } from "@/actions/videos";

interface VideosTableProps extends Video {
  presenter: { name: string } | null;
}

type Props = {
  data: VideosTableProps[];
  presenters: { id: string; name: string }[];
};

function VideosTable({ data, presenters }: Props) {
  return (
    <Table>
      <TableCaption>أحدث البرامج</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">البوستر</TableHead>
          <TableHead className="text-right">الاسم</TableHead>
          <TableHead className="text-right">تقديم</TableHead>
          <TableHead className="text-right">التاريخ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((video) => (
          <TableRow key={video.id}>
            <TableCell>
              <Link href={{ pathname: video.link }} target="_blank">
                <Image
                  alt="logo"
                  src={video.image}
                  width={100}
                  height={100}
                  className="rounded-xl"
                />
              </Link>
            </TableCell>
            <TableCell>{video.title}</TableCell>
            <TableCell>{video.presenter?.name}</TableCell>
            <TableCell>
              {new Date(video.createdAt).toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center gap-3">
                <VideoForm
                  key={video.id}
                  video={video}
                  announcers={presenters}
                />
                | <DeleteButton deleteAction={deleteVideo} id={video.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default VideosTable;
