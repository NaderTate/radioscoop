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
import Link from "next/link";
import { Post } from "@prisma/client";
import { deleteEpisode } from "@/lib/_actions";
interface ArticlesTableProps extends Post {
  presenter: { name: string } | null;
}
function ArticlesTable({ data }: { data: ArticlesTableProps[] }) {
  return (
    <div>
      <Table>
        <TableCaption>أحدث البرامج</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">البوستر</TableHead>
            <TableHead className="text-right">الاسم</TableHead>
            <TableHead className="text-right">تقديم</TableHead>
            <TableHead className="text-right">التصنيف</TableHead>
            <TableHead className="text-right">التاريخ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((article) => (
            <TableRow key={article.id}>
              <TableCell>
                <Link
                  href={{ pathname: `/articles/${article.id}` }}
                  target="_blank"
                >
                  <Image
                    alt="logo"
                    src={article.image}
                    width={100}
                    height={100}
                    className="rounded-xl"
                  />
                </Link>
              </TableCell>
              <TableCell>{article.title}</TableCell>
              <TableCell>{article?.presenter?.name}</TableCell>

              <TableCell>{article?.type}</TableCell>
              <TableCell>
                {new Date(article.createdAt).toLocaleDateString("ar-EG", {
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
                      query: { content: "video", id: article.id },
                    }}
                    target="_blank"
                  >
                    <FiEdit size={20} />
                  </Link>
                  |{" "}
                  <DeleteButton deleteAction={deleteEpisode} id={article.id} />{" "}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ArticlesTable;
