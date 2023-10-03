import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BiSearch } from "react-icons/bi";

function Search() {
  return (
    <Dialog>
      <DialogTrigger>
        <button className=" text-white bg-[#62657d94] hover:bg-[#757373b7] rounded-full hover:text-slate-100  shadow-sm block px-2 py-1.5">
          <BiSearch size={20} className=" " />
        </button>
      </DialogTrigger>
      <DialogContent>
        <Input />
      </DialogContent>
    </Dialog>
  );
}

export default Search;
