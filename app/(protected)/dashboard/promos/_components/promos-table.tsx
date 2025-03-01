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
import PromoForm from "./promo-form";
import DeleteButton from "@/components/dashboard/ConfirmDelete";

import { deletePromo } from "@/actions/promos";

type Props = {
  data: {
    id: string;
    link: string;
    image: string | null;
    createdAt: Date;
    category: { id: string; name: string; img: string } | null;
    presenters: { presenter: { id: string; name: string } }[];
  }[];
  presenters: { id: string; name: string }[];
  programs: {
    id: string;
    name: string;
    month: { name: string; year: { year: string } } | null;
  }[];
};

function PromosTable({ data, presenters, programs }: Props) {
  return (
    <Table>
      <TableCaption>أحدث العروض</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">الصورة</TableHead>
          <TableHead className="text-right">البرنامج</TableHead>
          <TableHead className="text-right">التقديم</TableHead>
          <TableHead className="text-right">التاريخ</TableHead>
          <TableHead className="text-right">الإجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((promo) => (
          <TableRow key={promo.id}>
            <TableCell>
              {promo.image ? (
                <Image
                  alt="promo image"
                  src={promo.image}
                  width={100}
                  height={100}
                  className="rounded-xl"
                />
              ) : promo.category?.img ? (
                <Image
                  alt="program image"
                  src={promo.category.img}
                  width={100}
                  height={100}
                  className="rounded-xl"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-300 rounded-xl"></div>
              )}
            </TableCell>

            <TableCell>
              {promo.category ? promo.category.name : "غير محدد"}
            </TableCell>
            <TableCell>
              {promo.presenters.map(({ presenter }) => (
                <h5 key={presenter.id}>{presenter.name}</h5>
              ))}
            </TableCell>
            <TableCell>
              {new Date(promo.createdAt).toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center gap-3">
                <PromoForm
                  key={promo.id}
                  programs={programs}
                  presenters={presenters}
                  promo={{
                    id: promo.id,
                    link: promo.link,

                    categoryId: promo.category?.id || "",
                    presenterIds: promo.presenters.map(
                      ({ presenter }) => presenter.id
                    ),
                  }}
                />
                | <DeleteButton deleteAction={deletePromo} id={promo.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PromosTable;
