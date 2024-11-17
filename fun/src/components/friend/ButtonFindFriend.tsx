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
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addFriend, getAllFriends } from "@/lib/user.request";
import { DialogDescription } from "@radix-ui/react-dialog";

interface Userz {
  id: number;
  name: string;
  avatarUrl: string;
}

export function ButtonFindFriend() {
  const {
    data: users,
    isError,
    isLoading,
  } = useQuery<Userz[]>({
    queryFn: getAllFriends,
    queryKey: ["users"],
  });

  const mutation = useMutation({
    mutationFn: (id: number) => addFriend(id),
    mutationKey: ["friend"],
  });

  if (isLoading) {
    return <div>Chargement des utilisateurs...</div>;
  }

  if (isError) {
    return <div>Une erreur est survenue.</div>;
  }

  if (!users || users.length === 0) {
    return <CommandEmpty>Aucun utilisateur trouvé.</CommandEmpty>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Rechercher un ami</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rechercher un ami</DialogTitle>
          <DialogDescription>
            Trouver un ami via son nom d'utilisateur
          </DialogDescription>
        </DialogHeader>
        <Command className="rounded-lg border shadow-md md:min-w-full">
          <CommandInput placeholder="Nom de l'utilisateur ..." />
          <CommandList>
            <CommandGroup>
              {users.map((user: Userz) => (
                <div key={user.id}>
                  <CommandSeparator />
                  <Button
                    variant="ghost"
                    className="w-full flex justify-start gap-3"
                    onClick={() => mutation.mutate(user.id)}
                  >
                    <div>{user.id}</div>
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
