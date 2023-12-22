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
import PresenterForm from "./PresenterForm";
import DeleteButton from "@/components/dashboard/ConfirmDelete";

import { deleteAnnouncer } from "@/actions/announcers";

type Props = {
  data: {
    id: string;
    name: string;
    img: string | null;
    Categories: { id: string }[];
  }[];
};

function AnnouncersTable({ data }: Props) {
  return (
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
                <PresenterForm announcer={presenter} key={presenter.id} /> |
                <DeleteButton
                  deleteAction={deleteAnnouncer}
                  id={presenter.id}
                />{" "}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AnnouncersTable;
