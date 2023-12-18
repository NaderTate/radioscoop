import Link from "next/link";

import { BiSolidChevronDown } from "react-icons/bi";

type Props = { children: React.ReactNode; label: string | number };

const NavItem = ({ children, label }: Props) => {
  return (
    <details className="group lg:relative ">
      <summary className="flex items-center justify-between hover:bg-[#848da065] group-open:bg-[#848da091] px-4 py-2 rounded-lg cursor-pointer text-slate-100">
        <span className="text-sm lg:text-md font-semibold flex whitespace-nowrap overflow-ellipsis xl:text-lg">
          {label}
        </span>
        <span className="ml-auto transition translate-y-[3px] duration-300 group-open:-rotate-180">
          <BiSolidChevronDown size={18} />
        </span>
      </summary>
      {children}
    </details>
  );
};

const NavContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav
      className={
        "flex flex-col mt-2 ml-8 group-open:bg-[#848da091]  rounded-md lg:absolute z-40 backdrop-blur-md"
      }
    >
      {children}
    </nav>
  );
};

const NavLink = ({ label, link }: { label: string | number; link: string }) => {
  return (
    <Link
      onClick={() => {
        const details = document.querySelectorAll("details");
        details.forEach((detail) => {
          detail.removeAttribute("open");
        });
      }}
      href={{ pathname: link }}
      className={
        "block whitespace-nowrap overflow-ellipsis px-4 group py-2 text-sm font-semibold rounded-lg text-slate-100 flex-grow hover:text-white hover:bg-[#848da065] border-b border-b-slate-700 md:border-0 lg:text-md xl:text-lg"
      }
    >
      {label}
    </Link>
  );
};

export { NavItem, NavContent, NavLink };
