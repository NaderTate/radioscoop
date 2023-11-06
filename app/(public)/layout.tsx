import Header from "@/components/Header";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const featureTypes = await prisma.featureType.findMany({
    select: {
      name: true,
      id: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  const seasons = await prisma.year.findMany({
    select: {
      year: true,
      months: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  return (
    <div>
      <Header featureTypes={featureTypes} seasons={seasons} />
      {children}
    </div>
  );
}
