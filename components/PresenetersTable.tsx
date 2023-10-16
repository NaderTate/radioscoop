import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteButton from "./DeleteButton";
import { deleteAuthor } from "@/lib/_actions";
import { Author } from "@prisma/client";
import PresenterForm from "./PresenterForm";
import Image from "next/image";
interface PresenetersTableProps extends Author {
  Categories: { id: string }[];
}
function PresenetersTable({ data }: { data: PresenetersTableProps[] }) {
  return (
    <div>
      <Table>
        <TableCaption> المذيعين</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right"></TableHead>
            <TableHead className="text-right">الاسم</TableHead>
            <TableHead className="text-right">عدد البرامج</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((presenter) => (
            <TableRow key={presenter.id}>
              <TableCell>
                {presenter?.img ? (
                  <Image
                    src={presenter.img}
                    width={100}
                    height={100}
                    alt={presenter.name}
                    className="rounded-md"
                  />
                ) : (
                  <Image
                    src="https://res.cloudinary.com/ddcjbeysn/image/upload/v1697469795/presenters/person-gray-photo-placeholder-woman-vector-22964655_yxnoiq_too0uo.jpg"
                    width={100}
                    height={100}
                    alt={presenter.name}
                    className="rounded-md"
                  />
                )}
              </TableCell>
              <TableCell>{presenter.name}</TableCell>
              <TableCell>{presenter.Categories.length}</TableCell>

              <TableCell className="text-right">
                <div className="flex gap-3 items-center">
                  <PresenterForm presenter={presenter} /> |
                  <DeleteButton
                    deleteAction={deleteAuthor}
                    id={presenter.id}
                  />{" "}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PresenetersTable;
