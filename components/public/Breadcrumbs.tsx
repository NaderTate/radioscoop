"use client";

import { Breadcrumbs as NUICrumbs, BreadcrumbItem } from "@nextui-org/react";

import { IoChevronBack } from "react-icons/io5";

type Props = { title: string; date: Date };

const Breadcrumbs = ({ title, date }: Props) => {
  return (
    <NUICrumbs separator={<IoChevronBack />} className="m-2 md:m-9">
      <BreadcrumbItem href="/">الصفحة الرئيسية</BreadcrumbItem>
      <BreadcrumbItem>
        {new Date(date).toLocaleDateString("ar-EG", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </BreadcrumbItem>
      <BreadcrumbItem>{title}</BreadcrumbItem>
    </NUICrumbs>
  );
};

export default Breadcrumbs;
