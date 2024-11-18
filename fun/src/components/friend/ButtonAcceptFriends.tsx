import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/lib/cards.utils";
import { getAllRequestFriend } from "@/lib/user.request";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import FriendCard from "./FriendCard";

function ButtonAcceptFriends() {
  const {
    data: users,
    isError,
    isLoading,
  } = useQuery<User[]>({
    queryFn: getAllRequestFriend,
    queryKey: ["users"],
  });

  if (isLoading) {
    return <div>Chargement des demandes...</div>;
  }
  if (isError) {
    return <div>Une erreur est survenue lors du chargement des demandes.</div>;
  }
  if (!users) return <div>pas de users</div>;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Demande d'amis</Button>
      </DialogTrigger>
      <DialogContent
        className="h-[400px] max-h-screen overflow-y-scroll"
        aria-labelledby="friend-dialog-title"
        aria-describedby="friend-dialog-description"
      >
        <DialogHeader>
          <DialogTitle id="friend-dialog-title">Demandes d'amis</DialogTitle>
          <DialogDescription id="friend-dialog-description">
            Liste des demandes d'amis que vous pouvez accepter ou refuser.
          </DialogDescription>
        </DialogHeader>
        {users.map((user) => (
          <FriendCard user={user} key={user.id} />
        ))}
      </DialogContent>
    </Dialog>
  );
}

export default ButtonAcceptFriends;
