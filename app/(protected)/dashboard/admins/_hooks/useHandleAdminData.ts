"use client";

import { useState, useTransition } from "react";

import { createNewAdmin, updateAdmin } from "@/actions/admins";

export const useHandleAdminData = (admin?: {
  id?: string;
  name?: string;
  email?: string;
}) => {
  const [adminData, setAdminData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(() => {
      if (admin?.id) {
        updateAdmin(admin.id, {
          ...adminData,
        });
      } else {
        createNewAdmin({
          ...adminData,
        });
      }
    });
  };
  return { adminData, setAdminData, isPending, onSubmit };
};
