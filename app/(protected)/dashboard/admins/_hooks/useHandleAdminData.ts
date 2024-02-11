"use client";

import { useState, useTransition } from "react";

import { createNewAdmin, updateAdmin } from "@/actions/admins";

export const useHandleAdminData = (admin?: {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}) => {
  const [adminData, setAdminData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    password: admin?.password || "",
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async () => {
    startTransition(() => {
      if (admin?.id) {
        updateAdmin(admin.id, {
          ...adminData,
        });
      } else {
        createNewAdmin({
          ...adminData,
        });
        setAdminData({
          name: "",
          email: "",
          password: "",
        });
      }
    });
  };
  return { adminData, setAdminData, isPending, onSubmit };
};
