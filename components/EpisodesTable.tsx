import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { FiEdit } from "react-icons/fi";
import { Episode } from "@prisma/client";
import Link from "next/link";
import { deleteEpisode } from "@/lib/_actions";
interface EpisodesTableProps extends Episode {
  category: { name: string } | null;
  author: { label: string } | null;
}
function EpisodesTable({ data }: { data: EpisodesTableProps[] }) {
  return (
    <div>
      <Table>
        <TableCaption>أحدث الحلقات</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">البوستر</TableHead>
            <TableHead className="text-right">الحلقة</TableHead>
            <TableHead className="text-right">البرنامج</TableHead>
            <TableHead className="text-right">تقديم</TableHead>
            <TableHead className="text-right">التاريخ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((ep) => (
            <TableRow key={ep.id}>
              <TableCell>
                <Link href={{ pathname: `/ep/${ep.id}` }} target="_blank">
                  <Image
                    alt="logo"
                    src={ep.img}
                    width={100}
                    height={100}
                    className="rounded-xl"
                  />
                </Link>
              </TableCell>
              <TableCell>{ep.title}</TableCell>
              <TableCell>{ep?.category?.name}</TableCell>
              <TableCell>{ep?.author?.label}</TableCell>
              <TableCell>
                {new Date(ep.createdAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-3">
                  <Link
                    className="cursor-pointer"
                    href={{
                      pathname: "/edit",
                      query: { content: "video", id: ep.id },
                    }}
                    target="_blank"
                  >
                    <FiEdit size={20} />
                  </Link>
                  | <DeleteButton deleteAction={deleteEpisode} id={ep.id} />{" "}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default EpisodesTable;