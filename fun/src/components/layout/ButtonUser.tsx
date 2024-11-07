import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/lib/user.request";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
function ButtonUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logout,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center justify-start w-full"
        >
          Déconnexion
          <LogOut className="w-4 h-4 ml-2 " />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Souhaitez vous vous déconnecter?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col items-start py-8">
          <Label htmlFor="username" className="flex justify-center w-full">
            Cette action va déconnecter de l'utilisateur
          </Label>
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => {
              mutation.mutate();
            }}
            disabled={mutation.isPending}
          >
            Déconnexion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ButtonUser;
