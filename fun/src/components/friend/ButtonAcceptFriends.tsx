import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/lib/cards.utils";
import { getAllRequestFriend } from "@/lib/user.request";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import FriendCard from "./FriendCard";
import { useState } from "react";

function ButtonAcceptFriends() {
  const [open, setOpen] = useState<boolean>(false);
  const {
    data: users,
    isError,
    isLoading,
  } = useQuery<User[]>({
    queryFn: getAllRequestFriend,
    queryKey: ["requestFriends"],
  });

  if (isLoading) {
    return <div>Chargement des demandes...</div>;
  }
  if (isError) {
    return <div>Aucune demandes</div>;
  }
  if (!users) return <div>pas de users</div>;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Demande d'amis</Button>
      </DialogTrigger>
      <DialogContent className="h-[400px] max-h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Demandes d'amis</DialogTitle>
          <DialogDescription>
            Liste des demandes d'amis que vous pouvez accepter ou refuser.
          </DialogDescription>
        </DialogHeader>
        {users.map((user) => (
          <FriendCard user={user} key={user.id} setOpen={setOpen} />
        ))}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ButtonAcceptFriends;
