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
interface FeaturesTableProps extends Episode {
  preparedBy: { name: string } | null;
  presenter: { name: string } | null;
}
function FeaturesTable({ data }: { data: FeaturesTableProps[] }) {
  return (
    <div>
      <Table>
        <TableCaption>أحدث الفيتشرات</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">البوستر</TableHead>
            <TableHead className="text-right">الاسم</TableHead>
            <TableHead className="text-right">اعداد</TableHead>
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
                    src={ep.img || ""}
                    width={100}
                    height={100}
                    className="rounded-xl"
                  />
                </Link>
              </TableCell>
              <TableCell>{ep.featureTitle}</TableCell>
              <TableCell>{ep?.preparedBy?.name}</TableCell>
              <TableCell>{ep?.presenter?.name}</TableCell>
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

export default FeaturesTable;
