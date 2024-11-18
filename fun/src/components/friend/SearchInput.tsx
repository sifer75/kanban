import { NetworkSolid, User, Xmark } from "iconoir-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchCategory, SearchFriendsProps } from "@/lib/cards.utils";

function SearchInput({
  setSearchFriends,
  setSelectedInput,
  selectedInput,
  searchFriends,
}: SearchFriendsProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="w-full relative">
      <Input
        placeholder="Recherche un ami ou un workspace ..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchFriends(e.target.value)
        }
        value={searchFriends}
      />
      <div className="absolute flex items-center justify-between gap-5 w-max top-0 right-0">
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="p-1 text-red-200 hover:bg-transparent"
            >
              {selectedInput}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sélection</DialogTitle>
              <DialogDescription>
                Recherche dans une de tes listes
              </DialogDescription>
            </DialogHeader>
            <div className="w-full flex justify-between">
              <Button
                variant="secondary"
                className="border-2 border-black hover:bg-slate-300 gap-4"
                onClick={() => {
                  setSelectedInput(SearchCategory.Workspace);
                  setOpen(false);
                }}
              >
                <NetworkSolid className="w-5 h-5" />
                {SearchCategory.Workspace}
              </Button>
              <Button
                variant="secondary"
                className="border-2 border-black hover:bg-slate-300 gap-4"
                onClick={() => {
                  setSelectedInput(SearchCategory.Ami);
                  setOpen(false);
                }}
              >
                <User className="w-5 h-5" />
                {SearchCategory.Ami}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          variant="ghost"
          className="p-2"
          onClick={() => setSearchFriends("")}
        >
          <Xmark className="w-5 h-5"></Xmark>
        </Button>
      </div>
    </div>
  );
}

export default SearchInput;
