"use client";

import { Admin } from "@prisma/client";

import AdminForm from "./AdminForm";
import ConfirmDelete from "@/components/ConfirmDelete";

import { deleteAdmin } from "@/actions/admins";

type Props = {
  admin: Admin;
};

function AdminCard({ admin }: Props) {
  return (
    <div
      key={admin.id}
      className="border-divider border-2 rounded-md p-5 relative w-80"
    >
      <span>{admin.name}</span>
      <span className="line-clamp-1">{admin.email}</span>
      <div className="absolute top-2 left-2">
        <ConfirmDelete deleteAction={deleteAdmin} id={admin.id} />
      </div>
      <div className="absolute top-2 left-8">
        <AdminForm admin={admin} />
      </div>
    </div>
  );
}

export default AdminCard;
