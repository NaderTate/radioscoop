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
import FeatureForm from "./FeatureForm";
import DeleteButton from "@/components/dashboard/ConfirmDelete";

import { deleteFeature } from "@/actions/features";

type Props = {
  data: {
    id: string;
    featureTitle: string | null;
    img: string | null;
    createdAt: Date;
    preparedById: string | null;
    presenterId: string | null;
    link: string;
    typeId: string | null;
    preparedBy: { name: string } | null;
    presenter: { name: string } | null;
    embedLink: string | null;
  }[];
  presenters: { id: string; name: string }[];
  types: { id: string; name: string }[];
};

function FeaturesTable({ data, presenters, types }: Props) {
  return (
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
        {data.map((feature) => (
          <TableRow key={feature.id}>
            <TableCell>
              <Link href={{ pathname: `/ep/${feature.id}` }} target="_blank">
                <Image
                  alt="logo"
                  src={feature.img || ""}
                  width={100}
                  height={100}
                  className="rounded-xl"
                />
              </Link>
            </TableCell>
            <TableCell>{feature.featureTitle}</TableCell>
            <TableCell>{feature?.preparedBy?.name}</TableCell>
            <TableCell>{feature?.presenter?.name}</TableCell>
            <TableCell>
              {new Date(feature.createdAt).toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center gap-3">
                <FeatureForm
                  key={feature.id}
                  types={types}
                  presenters={presenters}
                  feature={feature}
                />
                | <DeleteButton deleteAction={deleteFeature} id={feature.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default FeaturesTable;
