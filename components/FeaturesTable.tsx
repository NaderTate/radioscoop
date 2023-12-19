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
import { FiEdit } from "react-icons/fi";
import { Episode } from "@prisma/client";
import Link from "next/link";
import { deleteFeature } from "@/lib/_actions";
import FeatureForm from "./FeatureForm";
interface FeaturesTableProps extends Episode {
  preparedBy: { name: string } | null;
  presenter: { name: string } | null;
}
function FeaturesTable({
  data,
  presenters,
  types,
}: {
  data: FeaturesTableProps[];
  presenters: { id: string; name: string }[];
  types: { id: string; name: string }[];
}) {
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
                <div className="flex gap-3">
                  <FeatureForm
                    types={types}
                    presenters={presenters}
                    feature={feature}
                  />
                  |{" "}
                  <DeleteButton deleteAction={deleteFeature} id={feature.id} />{" "}
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
