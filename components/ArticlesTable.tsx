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
import DeleteButton from "./ConfirmDelete";
import Link from "next/link";
import { Post } from "@prisma/client";
import { deleteArticle } from "@/lib/_actions";
import ArticleForm from "./ArticleForm";
interface ArticlesTableProps extends Post {
  presenter: { name: string } | null;
  type: { name: string } | null;
}
function ArticlesTable({
  data,
  presenters,
  types,
  postMonths,
  years,
}: {
  data: ArticlesTableProps[];
  presenters: { id: string; name: string }[];
  types: { id: string; name: string }[];
  years: { id: string; year: string }[];
  postMonths: { id: string; name: string; year: { year: string } }[];
}) {
  return (
    <div>
      <Table>
        <TableCaption>أحدث المقالات</TableCaption>
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

              <TableCell>{article?.type?.name}</TableCell>
              <TableCell>
                {new Date(article.createdAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-3">
                  <ArticleForm
                    years={years}
                    postMonths={postMonths}
                    types={types}
                    presenters={presenters}
                    article={article}
                  />
                  |{" "}
                  <DeleteButton deleteAction={deleteArticle} id={article.id} />{" "}
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
