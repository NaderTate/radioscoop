import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { Toaster } from "@/components/ui/toaster";

import { authOptions } from "@/lib/authOptions";
import Sidebar from "@/components/dashboard/sidebar";

export const metadata: Metadata = {
  title: "RadioScoop - Dashboard",
  description: "Manage RadioScoop's content.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  // if (!session) redirect("/login");

  return (
    <div dir="rtl" className="px-5 pt-12">
      <div className="fixed z-20 top-5 right-5">
        <Sidebar />
      </div>
      {children}
      <Toaster />
    </div>
  );
}
