import Link from "next/link";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProgramForm from "@/components/dashboard/ProgramForm";
import DeleteButton from "@/components/dashboard/ConfirmDelete";

import { deleteProgram } from "@/actions/program";

type Props = {
  data: {
    id: string;
    name: string;
    img: string;
    createdAt: Date;
    authorId: string | null | undefined;
    author: { name: string } | null;
    episodes: { id: string }[] | null;
    month: { name: string; year: { year: string } } | null;
  }[];
  presenters: { id: string; name: string }[];
};

function ProgramsTable({ data, presenters }: Props) {
  return (
    <Table>
      <TableCaption>أحدث البرامج</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">البوستر</TableHead>
          <TableHead className="text-right">البرنامج</TableHead>
          <TableHead className="text-right">الموسم</TableHead>
          <TableHead className="text-right">تقديم</TableHead>
          <TableHead className="text-right">عدد الحلقات</TableHead>
          <TableHead className="text-right">التاريخ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((program) => (
          <TableRow key={program.id}>
            <TableCell>
              <Link
                href={{ pathname: `/program/${program.id}` }}
                target="_blank"
              >
                <Image
                  alt="logo"
                  src={program.img}
                  width={100}
                  height={100}
                  className="rounded-xl"
                />
              </Link>
            </TableCell>
            <TableCell>{program.name}</TableCell>
            <TableCell>
              {program?.month?.year.year} - {program?.month?.name}
            </TableCell>
            <TableCell>{program?.author?.name}</TableCell>
            <TableCell>{program?.episodes?.length}</TableCell>
            <TableCell>
              {new Date(program.createdAt).toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center gap-3">
                <ProgramForm
                  key={program.id}
                  presenters={presenters}
                  program={program}
                />
                | <DeleteButton deleteAction={deleteProgram} id={program.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ProgramsTable;
