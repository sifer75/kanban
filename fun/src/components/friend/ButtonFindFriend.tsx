import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandGroup,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useMutation, useQuery } from "@tanstack/react-query";
import { requestFriend, getAllUsers } from "@/lib/user.request";
import { DialogDescription } from "@radix-ui/react-dialog";
import { User } from "@/lib/cards.utils";
import { useState } from "react";
import { Input } from "../ui/input";

export function ButtonFindFriend() {
  const [findUser, setFindUser] = useState<string>("");
  const [listOfNewFriends, setListOfNewFriends] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const {
    data: users,
    isError,
    isLoading,
  } = useQuery<User[]>({
    queryFn: getAllUsers,
    queryKey: ["allUsers"],
  });

  const mutation = useMutation({
    mutationFn: (id: number) => requestFriend(id),
    mutationKey: ["friend"],
  });

  if (isLoading) {
    return <div>Chargement des utilisateurs...</div>;
  }

  if (isError) {
    return <div>Une erreur est survenue.</div>;
  }

  if (!users || users.length === 0) {
    return <Button>Aucun utilisateur trouvé.</Button>;
  }

  const filterUser = users.filter((user) =>
    user.name.toLowerCase().includes(findUser.toLowerCase())
  );

  const availableUsers = filterUser.filter(
    (user) => !listOfNewFriends.includes(user.id)
  );

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>Trouver un ami</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rechercher un ami</DialogTitle>
          <DialogDescription>Envoyer une demande d'ami</DialogDescription>
        </DialogHeader>
        <Command className="rounded-lg border shadow-md md:min-w-full">
          <Input
            placeholder="Nom de l'utilisateur ..."
            value={findUser}
            onChange={(e) => setFindUser(e.target.value)}
          />
          <CommandList>
            <CommandGroup>
              {availableUsers.map((user: User) => (
                <div key={user.id}>
                  <CommandSeparator />
                  <Button
                    variant="ghost"
                    className="w-full flex justify-start gap-3"
                    onClick={() => {
                      mutation.mutate(user.id);
                      setListOfNewFriends((prev) => [...prev, user.id]);
                      setOpen(false);
                    }}
                  >
                    <img
                      src={user.avatarUrl}
                      alt={`${user.name}_logo`}
                      className="w-6 h-6 rounded-full"
                    ></img>
                    <span>{user.name}</span>
                  </Button>
                </div>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export default ButtonFindFriend;
