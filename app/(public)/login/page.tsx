"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginFrom from "@/components/LoginFrom";

const Page = () => {
  // get the session from the server side and redirect if user is logged in
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div
      dir="ltr"
      className="h-screen  flex flex-col items-center justify-center"
    >
      <LoginFrom />
    </div>
  );
};

export default Page;
