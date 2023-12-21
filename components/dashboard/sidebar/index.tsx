"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "@/components/ThemeToggle";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { menuItems } from "./menuItems";

function Sidebar() {
  const { data: session }: any = useSession();
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <GiHamburgerMenu size={25} />
        </SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle className="m-auto mr-0">
              <Link href={{ pathname: "/" }}>
                <SheetClose>
                  <Image
                    alt="logo"
                    src={"/logo.png"}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </SheetClose>
              </Link>
            </SheetTitle>
            <div className="flex flex-col items-start font-bold tracking-wider ">
              {menuItems.map((item) => (
                <Link href={{ pathname: item.link }} key={item.title}>
                  <SheetDescription className="my-2">
                    <SheetClose>
                      <div className="navItem">
                        <div className="flex items-center gap-5 text-base ">
                          {item.icon}
                          {item.title}
                        </div>
                      </div>
                    </SheetClose>
                  </SheetDescription>
                </Link>
              ))}
              <ThemeToggle />
              <Separator className="bg-muted-foreground my-2" />
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src={session?.user?.image} />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center mx-2">
                  <span className="text-base font-bold">
                    {session?.user?.name}
                  </span>
                </div>
              </div>
              <span className="font-light text-sm my-2">
                {session?.user?.email}
              </span>
              <Button onClick={() => signOut()}>
                <FiLogOut />
                تسجيل الخروج
              </Button>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Sidebar;
